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
import { IJobExprience } from 'src/common/interface/exprience.interface';
import { JobGenderEnum } from 'src/common/enum/job-gender.enum';
import { JobDutySystemEnum } from 'src/common/enum/job-duty-system.enum';
import { JobEducationEnum } from 'src/common/enum/job-education.enum';
import { IJobColaborationTime } from 'src/common/interface/job-colaboration-time.interface';
import { CompanyEntity } from './company.entity';
import { JobSeekerEntity } from './job-seeker.entity';

@Entity('job')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ enum: JobColaborationTypeEnum, type: 'enum', array: true })
  collaborationType: JobColaborationTypeEnum[];

  @Column({ type: 'jsonb', nullable: true })
  collaborationTime?: IJobColaborationTime;

  @Column({ nullable: true, type: 'jsonb' })
  experience?: IJobExprience;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: JobGenderEnum, nullable: true })
  gender?: JobGenderEnum;

  @Column({
    type: 'enum',
    enum: JobDutySystemEnum,
    array: true,
    nullable: true,
  })
  dutySystem?: JobDutySystemEnum[];

  @Column({ type: 'enum', enum: JobEducationEnum, array: true, nullable: true })
  education?: JobEducationEnum[];

  @ManyToOne(() => CompanyEntity, (company) => company.job)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @ManyToMany(() => JobSeekerEntity, (jobSeeker) => jobSeeker.appliedJob)
  jobSeeker: JobSeekerEntity[];
}
