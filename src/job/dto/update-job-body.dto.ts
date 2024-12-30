import { PartialType } from '@nestjs/swagger';
import { CreateJobBodyDto } from './create-job-body.dto';

export class UpdateJobBodyDto extends PartialType(CreateJobBodyDto) {}
