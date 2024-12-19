import { InjectDataSource } from '@nestjs/typeorm';
import { FounderEntity } from '../entity/founder.entity';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

export class FounderRepository extends BaseRepository<FounderEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(FounderEntity, dataSource);
  }

  async createFounder(
    entity: Pick<UserEntity, 'email' | 'password' | 'role'> &
      Pick<FounderEntity, 'cellphone'>,
  ) {
    let userId: UserEntity['id'];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const insertUserResult = await queryRunner.manager.insert(UserEntity, {
        email: entity.email,
        password: entity.password,
        role: entity.role,
      });

      userId = insertUserResult.generatedMaps[0].id;

      await queryRunner.manager.insert(FounderEntity, {
        cellphone: entity.cellphone,
        user: { id: userId },
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }

    return userId;
  }
}
