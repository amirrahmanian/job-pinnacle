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

@Entity('job-saved')
@Index('job-saved_jobSeekerId_jobId_idx', ['jobSeekerId', 'jobId'], {
  unique: true,
})
export class JobsavedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobSeekerId: number;

  @Column()
  jobId: number;

  @ManyToOne(() => JobSeekerEntity, (jobSeeker) => jobSeeker.jobSaved)
  @JoinColumn({ name: 'jobSeekerId' })
  jobSeeker: JobSeekerEntity;

  @ManyToOne(() => JobEntity, (job) => job.jobSaved)
  @JoinColumn({ name: 'jobId' })
  job: JobEntity;
}
