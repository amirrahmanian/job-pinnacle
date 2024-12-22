import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyBodyDto } from './dto/create-company-body.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { CompanyRepository } from 'src/db/repository/company.repository';
import { CompanyEntity } from 'src/db/entity/company.entity';
import { UserEntity } from 'src/db/entity/user.entity';
import { UserRepository } from 'src/db/repository/user.repository';
import { CompanyIdParamDto } from '../common/dto/company-id-param.dto';
import { UpdateCompanyBodyDto } from './dto/update-company-body.dto';
import { FounderEntity } from 'src/db/entity/founder.entity';
import { FounderRepository } from 'src/db/repository/founder.repository';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository,
    private founderRepository: FounderRepository,
  ) {}

  async createCompany(
    body: CreateCompanyBodyDto,
    userPayload: UserPayload,
    logo?: any,
  ) {
    const user: Pick<UserEntity, 'id'> = await this.userRepository.findOne({
      where: { id: userPayload.userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('user.not_found');
    }

    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { user: { id: user.id } },
        select: { id: true },
      });

    if (!founder) {
      throw new NotFoundException('founder.not_found');
    }

    const insertCompanyResult = await this.companyRepository.insert({
      name: body.name,
      location: body.location,
      webSite: body.webSite,
      size: body.size,
      industry: body.industry,
      establishmentYear: new Date(body.establishmentYear),
      ownershipType: body.ownershipType,
      about: body.about,
      logo: logo?.path,
      userId: user.id,
      founder: { id: founder.id },
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
    const company: Pick<CompanyEntity, 'id' | 'userId'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId },
        select: { id: true, userId: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    if (company.userId !== userPayload.userId) throw new ForbiddenException();

    let establishmentAt: Date;
    if (body.establishmentYear != undefined) {
      establishmentAt = new Date(body.establishmentYear);
    }

    await this.companyRepository.update(
      {
        id: company.id,
      },
      {
        name: body.name,
        location: body.location,
        webSite: body.webSite,
        size: body.size,
        industry: body.industry,
        establishmentYear: establishmentAt,
        ownershipType: body.ownershipType,
        about: body.about,
        logo: logo?.path,
      },
    );
  }

  async deleteCompany(param: CompanyIdParamDto, userPayload: UserPayload) {
    const company: Pick<CompanyEntity, 'id' | 'userId'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId },
        select: { id: true, userId: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    if (company.userId !== userPayload.userId) throw new ForbiddenException();

    const deleteResualt = this.companyRepository.softDelete({
      id: param.companyId,
    });

    const deleted = !!deleteResualt;

    return deleted;
  }
}
