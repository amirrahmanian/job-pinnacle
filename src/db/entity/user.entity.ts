import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobEntity } from './job.entity';
import { RoleEnum } from 'src/common/enum/role.enum';

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

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @Column({ nullable: true })
  resume?: string;

  @ManyToMany(() => JobEntity, (job) => job.appliedUsers)
  @JoinTable({ name: 'applied-jobs' })
  appliedJobs: JobEntity[];

  @ManyToMany(() => JobEntity)
  @JoinTable({ name: 'saved-jobs' })
  savedJobs: JobEntity[];
}
