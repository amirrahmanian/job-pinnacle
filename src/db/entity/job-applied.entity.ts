import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobSeekerEntity } from './job-seeker.entity';
import { JobEntity } from './job.entity';

@Entity('job-applied')
@Index('job-applied_jobSeekerId_jobId_idx', ['jobSeekerId', 'jobId'], {
  unique: true,
})
export class JobAppliedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobSeekerId: number;

  @Column()
  jobId: number;

  @ManyToOne(() => JobSeekerEntity, (jobSeeker) => jobSeeker.jobApplied)
  @JoinColumn({ name: 'jobSeekerId' })
  jobSeeker: JobSeekerEntity;

  @ManyToOne(() => JobEntity, (job) => job.jobApplied)
  @JoinColumn({ name: 'jobId' })
  job: JobEntity;
}
