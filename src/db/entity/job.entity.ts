import { JobColaborationTypeEnum } from 'src/common/enum/job-colaboration-type.enum';
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
import { IJobExprience } from 'src/common/interface/exprience.interface';
import { JobGenderEnum } from 'src/common/enum/job-gender.enum';
import { JobActivityAreaEnum } from 'src/common/enum/job-activity-area.enum';
import { JobDutySystemEnum } from 'src/common/enum/job-duty-system.enum';
import { JobEducationEnum } from 'src/common/enum/job-education.enum';

@Entity('job')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ enum: JobActivityAreaEnum, type: 'enum' })
  activityArea: JobActivityAreaEnum;

  @Column({ enum: JobColaborationTypeEnum, type: 'enum' })
  collaborationType: JobColaborationTypeEnum;

  @Column({ type: 'int', nullable: true })
  minimumSalary?: number;

  @Column({ nullable: true, type: 'jsonb' })
  experience?: IJobExprience;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: JobGenderEnum })
  gender: JobGenderEnum;

  @Column({ type: 'enum', enum: JobDutySystemEnum })
  dutySystem: JobDutySystemEnum;

  @Column({ type: 'enum', enum: JobEducationEnum })
  education: JobEducationEnum;

  @ManyToOne(() => CompanyEntity, (company) => company.jobs)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @ManyToMany(() => UserEntity, (user) => user.appliedJobs)
  appliedUsers: UserEntity[];
}
