import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('founder')
export class FounderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cellphone: string;

  @OneToOne(() => UserEntity, (user) => user.founder)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
