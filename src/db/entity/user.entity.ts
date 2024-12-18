import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';
import { FounderEntity } from './founder.entity';
import { JobSeekerEntity } from './job-seeker.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @OneToOne(() => FounderEntity, (founder) => founder.user)
  founder: FounderEntity;

  @OneToOne(() => JobSeekerEntity, (jobSeeker) => jobSeeker.user)
  jobSeeker: JobSeekerEntity;
}
