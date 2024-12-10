import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
