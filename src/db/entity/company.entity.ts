import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobEntity } from './job.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo?: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  webSiteURL?: string;

  @Column()
  activityArea: string;

  @Column()
  description: string;

  @Column({ type: 'int' })
  capacity: number;

  @OneToMany(() => JobEntity, (job) => job.company)
  jobs: JobEntity[];
}
