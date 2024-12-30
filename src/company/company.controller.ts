import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Private } from 'src/auth/decorator/private.decorator';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';
import { CompanyService } from './company.service';
import { CreateCompanyBodyDto } from './dto/create-company-body.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { UpdateCompanyBodyDto } from './dto/update-company-body.dto';
import { CompanyIdParamDto } from '../common/dto/company-id-param.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiBearerAuth()
  @Post()
  @Private(UserRoleEnum.FOUNDER)
  @ApiOperation({
    summary: 'Create a new company',
    description: 'Create a new company with the provided details.',
  })
  @ApiResponse({ status: 201, description: 'Company created successfully.' })
  async createCompany(
    @Body() createCompanyBodyDto: CreateCompanyBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.companyService.createCompany(createCompanyBodyDto, userPayload);
  }

  @ApiBearerAuth()
  @Put(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update an existing company',
    description: 'Update the details of an existing company.',
  })
  @ApiParam({
    name: 'companyId',
    description: 'The unique identifier of the company to update.',
    example: '12345',
  })
  @ApiResponse({ status: 204, description: 'Company updated successfully.' })
  async updateCompany(
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

  @ApiBearerAuth()
  @Delete(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a company',
    description: 'Delete an existing company by its ID.',
  })
  @ApiParam({
    name: 'companyId',
    description: 'The unique identifier of the company to delete.',
    example: '12345',
  })
  @ApiResponse({ status: 204, description: 'Company deleted successfully.' })
  async deleteCompany(
    @Param() companyIdParamDto: CompanyIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.companyService.deleteCompany(companyIdParamDto, userPayload);
  }

  @Get(':companyId/info')
  @Public()
  @ApiOperation({
    summary: 'Get company information',
    description: 'Retrieve public information about a company.',
  })
  @ApiParam({
    name: 'companyId',
    description: 'The unique identifier of the company to retrieve.',
    example: '12345',
  })
  @ApiResponse({
    status: 200,
    description: 'Company information retrieved successfully.',
  })
  getCompanyInfo(@Param() companyIdParamDto: CompanyIdParamDto) {
    return this.companyService.getCompanyInfo(companyIdParamDto);
  }
}
