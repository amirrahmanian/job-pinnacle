import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
