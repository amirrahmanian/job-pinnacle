import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyBodyDto } from './dto/create-company-body.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { CompanyRepository } from 'src/db/repository/company.repository';
import { CompanyEntity } from 'src/db/entity/company.entity';
import { CompanyIdParamDto } from '../common/dto/company-id-param.dto';
import { UpdateCompanyBodyDto } from './dto/update-company-body.dto';
import { FounderEntity } from 'src/db/entity/founder.entity';
import { FounderRepository } from 'src/db/repository/founder.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private founderRepository: FounderRepository,
  ) {}

  async createCompany(
    body: CreateCompanyBodyDto,
    userPayload: UserPayload,
    logo?: any,
  ) {
    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) {
      throw new NotFoundException('founder.not_found');
    }

    const insertCompanyResult = await this.companyRepository.insert({
      founderId: founder.id,
      name: body.name,
      location: body.location,
      website: body.website,
      size: body.size,
      industry: body.industry,
      establishmentYear: new Date(body.establishmentYear),
      ownershipType: body.ownershipType,
      about: body.about,
      logo: logo?.path,
    });

    const companyId: CompanyEntity['id'] =
      insertCompanyResult.generatedMaps[0].id;

    return { id: companyId };
  }

  async updateCompany(
    param: CompanyIdParamDto,
    body: UpdateCompanyBodyDto,
    userPayload: UserPayload,
    logo?: any,
  ) {
    const company: Pick<CompanyEntity, 'id' | 'founderId'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId },
        select: { id: true, founderId: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) throw new NotFoundException('founder.not_found');

    if (company.founderId !== founder.id) throw new ForbiddenException();

    const updateObj: DeepPartial<CompanyEntity> = {};

    if (body.establishmentYear) {
      updateObj.establishmentYear = new Date(body.establishmentYear);
    }

    await this.companyRepository.update(
      {
        id: company.id,
      },
      {
        name: body.name,
        location: body.location,
        website: body.website,
        size: body.size,
        industry: body.industry,
        establishmentYear: updateObj.establishmentYear,
        ownershipType: body.ownershipType,
        about: body.about,
        logo: logo?.path,
      },
    );
  }

  async deleteCompany(param: CompanyIdParamDto, userPayload: UserPayload) {
    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) throw new NotFoundException('founder.not_found');

    const company: Pick<CompanyEntity, 'id' | 'founderId'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId },
        select: { id: true, founderId: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    if (founder.id !== company.founderId) {
      throw new ForbiddenException();
    }

    await this.companyRepository.softDeleteWithRelatedData(company.id);
  }

  async getCompanyInfo(param: CompanyIdParamDto) {
    const company: Pick<
      CompanyEntity,
      | 'id'
      | 'about'
      | 'establishmentYear'
      | 'industry'
      | 'location'
      | 'logo'
      | 'name'
      | 'ownershipType'
      | 'size'
      | 'website'
    > = await this.companyRepository.findOne({
      where: { id: param.companyId },
      select: {
        id: true,
        about: true,
        establishmentYear: true,
        industry: true,
        location: { address: true, latitude: true, longitude: true },
        logo: true,
        name: true,
        ownershipType: true,
        size: { max: true, min: true },
        website: true,
      },
    });

    if (!company) throw new NotFoundException('company.not_found');

    return company;
  }
}
