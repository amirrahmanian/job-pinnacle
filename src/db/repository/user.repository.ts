import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserEntity } from '../entity/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
