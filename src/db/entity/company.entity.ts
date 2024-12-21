import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ICompanyLocation } from 'src/common/interface/company-location.interface';
import { ICompanySize } from 'src/common/interface/company-size.interface';
import { CompanyIndustryEnum } from 'src/common/enum/company-industry.enum';
import { CompanyOwnershipTypeEnum } from 'src/common/enum/company-ownership-type.enum';
import { FounderEntity } from './founder.entity';
import { JobEntity } from './job.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  location: ICompanyLocation;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  webSite?: string;

  @Column({ type: 'jsonb' })
  size: ICompanySize;

  @Column({ array: true, type: 'enum', enum: CompanyIndustryEnum })
  industry: CompanyIndustryEnum[];

  @Column({ type: 'timestamptz' })
  establishmentYear: Date;

  @Column({ type: 'enum', enum: CompanyOwnershipTypeEnum })
  ownershipType: CompanyOwnershipTypeEnum;

  @Column()
  about: string;

  @ManyToOne(() => FounderEntity)
  @JoinColumn({ name: 'founderId' })
  founder: FounderEntity;

  @OneToMany(() => JobEntity, (job) => job.company)
  job: JobEntity[];
}
