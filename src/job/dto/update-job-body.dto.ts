import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBodyDto } from './create-job-body.dto';

export class UpdateJobBodyDto extends PartialType(CreateJobBodyDto) {}
