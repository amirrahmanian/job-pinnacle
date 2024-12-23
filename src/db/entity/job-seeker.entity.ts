import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { JobAppliedEntity } from './job-applied.entity';
import { JobsavedEntity } from './job-saved.entity';

@Entity('job-seeker')
export class JobSeekerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  resume?: string;

  @OneToOne(() => UserEntity, (user) => user.jobSeeker)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => JobAppliedEntity, (jobApplied) => jobApplied.jobSeeker)
  jobApplied: JobAppliedEntity[];

  @OneToMany(() => JobsavedEntity, (jobSaved) => jobSaved.jobSeeker)
  jobSaved: JobsavedEntity[];
}
