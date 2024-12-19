import { InjectDataSource } from '@nestjs/typeorm';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { JobSeekerEntity } from '../entity/job-seeker.entity';
import { UserEntity } from '../entity/user.entity';

export class JobSeekerRepository extends BaseRepository<JobSeekerEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(JobSeekerEntity, dataSource);
  }

  async createJobSeeker(
    entity: Pick<UserEntity, 'email' | 'password' | 'role'> &
      Pick<JobSeekerEntity, 'firstName' | 'lastName'>,
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

      await queryRunner.manager.insert(JobSeekerEntity, {
        firstName: entity.firstName,
        lastName: entity.lastName,
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
