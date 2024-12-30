import { CreateCompanyBodyDto } from './create-company-body.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCompanyBodyDto extends PartialType(CreateCompanyBodyDto) {}
