import { CreateCompanyBodyDto } from './create-company-body.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCompanyBodyDto extends PartialType(CreateCompanyBodyDto) {}
