import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
