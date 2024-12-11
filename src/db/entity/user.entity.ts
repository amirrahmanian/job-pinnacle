import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobEntity } from './job.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resume?: string;

  @ManyToMany(() => JobEntity, (job) => job.appliedUsers)
  @JoinTable({ name: 'applied-jobs' })
  appliedJobs: JobEntity[];

  @ManyToMany(() => JobEntity)
  @JoinTable({ name: 'saved-jobs' })
  savedJobs: JobEntity[];
}
