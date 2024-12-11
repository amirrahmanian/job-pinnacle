import { ColaborationTypeEnum } from 'src/common/enum/colaboration-type.enum';
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

@Entity('job')
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

  @Column({ enum: ColaborationTypeEnum })
  collaborationType: ColaborationTypeEnum;

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

  @Column('varchar', { array: true, nullable: true })
  skills?: string[];

  @ManyToOne(() => CompanyEntity, (company) => company.jobs)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @ManyToMany(() => UserEntity, (user) => user.appliedJobs)
  appliedUsers: UserEntity[];
}
