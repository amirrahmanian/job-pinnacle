import { JobColaborationTypeEnum } from 'src/common/enum/job-colaboration-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { IJobExprience } from 'src/common/interface/exprience.interface';
import { JobGenderEnum } from 'src/common/enum/job-gender.enum';
import { JobDutySystemEnum } from 'src/common/enum/job-duty-system.enum';
import { JobEducationEnum } from 'src/common/enum/job-education.enum';
import { IJobColaborationTime } from 'src/common/interface/job-colaboration-time.interface';
import { CompanyEntity } from './company.entity';
import { JobAppliedEntity } from './job-applied.entity';
import { JobsavedEntity } from './job-saved.entity';
import { JobCityEnum } from 'src/common/enum/job-city.enum';
import { IJobSalery } from 'src/common/interface/job-salary.interface';
import { FounderEntity } from './founder.entity';

@Entity('job')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: number;

  @Column()
  founderId: number;

  @Column({ type: 'boolean' })
  immediate: boolean;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: JobCityEnum })
  city: JobCityEnum;

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

  @Column({ nullable: true, type: 'jsonb' })
  salery?: IJobSalery;

  @ManyToOne(() => CompanyEntity, (company) => company.job)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @OneToMany(() => JobAppliedEntity, (jobApplied) => jobApplied.job)
  jobApplied: JobAppliedEntity[];

  @OneToMany(() => JobsavedEntity, (jobSaved) => jobSaved.job)
  jobSaved: JobsavedEntity[];

  @ManyToOne(() => FounderEntity, (founder) => founder.job)
  @JoinColumn({ name: 'founderId' })
  founder: FounderEntity;
}
