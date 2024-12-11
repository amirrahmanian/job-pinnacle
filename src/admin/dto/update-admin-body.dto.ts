import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminBodyDto } from './create-admin-body.dto';

export class UpdateAdminBodyDto extends PartialType(CreateAdminBodyDto) {}
