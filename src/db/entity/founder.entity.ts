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
import { JobEntity } from './job.entity';
import { JobAppliedEntity } from './job-applied.entity';

@Entity('founder')
export class FounderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  cellphone: string;

  @OneToOne(() => UserEntity, (user) => user.founder)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => JobEntity, (job) => job.founder)
  job: JobEntity[];

  @OneToMany(() => JobAppliedEntity, (jobApplied) => jobApplied.founder)
  jobApplied: JobAppliedEntity[];
}
