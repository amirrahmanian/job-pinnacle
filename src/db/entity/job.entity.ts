import { ColaborationType } from 'src/common/enum/common.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';

@Entity()
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  jobActivity: string;

  @Column()
  activityArea: string;

  @Column()
  location: string;

  @Column({ enum: ColaborationType })
  collaborationType: ColaborationType;

  @Column()
  salary: string;

  @Column()
  description: string;

  @Column()
  experience: string;

  @Column()
  gender: string;

  @Column()
  dutySystem: string;

  @Column()
  education: string;

  @Column({ type: 'array', nullable: true })
  skills?: string[];

  @ManyToOne(() => CompanyEntity, (company) => company.jobs)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @ManyToMany(() => UserEntity, (user) => user.appliedJobs)
  appliedUsers: UserEntity[];
}
