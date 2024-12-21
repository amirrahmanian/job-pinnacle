import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Private } from 'src/auth/decorator/private.decorator';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';
import { CompanyService } from './company.service';
import { CreateCompanyBodyDto } from './dto/create-company-body.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { UpdateCompanyBodyDto } from './dto/update-company-body.dto';
import { CompanyIdParamDto } from './dto/company-id-param.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @Private(UserRoleEnum.FOUNDER)
  createCompany(
    @Body() createCompanyBodyDto: CreateCompanyBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.companyService.createCompany(createCompanyBodyDto, userPayload);
  }

  @Put(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  updateCompany(
    @Param() companyIdParamDto: CompanyIdParamDto,
    @Body() updateCompanyBodyDto: UpdateCompanyBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.companyService.updateCompany(
      companyIdParamDto,
      updateCompanyBodyDto,
      userPayload,
    );
  }

  @Delete(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  async deleteCompany(
    @Param() companyIdParamDto: CompanyIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.companyService.deleteCompany(companyIdParamDto, userPayload);
  }
}
