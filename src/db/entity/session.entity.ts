import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { RoleEnum } from 'src/common/enum/role.enum';

@Entity('session')
@Index('session_key_idx', ['key'], { unique: true })
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @Column()
  key: string;

  @Column({ type: 'timestamptz' })
  expireDate: Date;

  @Column()
  ip: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  device?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
