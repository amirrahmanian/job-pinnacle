import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { JobEntity } from './job.entity';

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

  @ManyToMany(() => JobEntity, (job) => job.jobSeeker)
  @JoinTable({ name: 'applied-job' })
  appliedJob: JobEntity[];

  @ManyToMany(() => JobEntity)
  @JoinTable({ name: 'saved-job' })
  savedJob: JobEntity[];
}
