import { Injectable } from '@nestjs/common';
import { JobRepository } from 'src/db/repository/job.repository';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async createJob(body: CreateJobDto) {}
}
