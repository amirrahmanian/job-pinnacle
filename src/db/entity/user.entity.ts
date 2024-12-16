import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobEntity } from './job.entity';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @Column({ nullable: true })
  resume?: string;

  @ManyToMany(() => JobEntity, (job) => job.appliedUsers)
  @JoinTable({ name: 'applied-jobs' })
  appliedJobs: JobEntity[];

  @ManyToMany(() => JobEntity)
  @JoinTable({ name: 'saved-jobs' })
  savedJobs: JobEntity[];
}
