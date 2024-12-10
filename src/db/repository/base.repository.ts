import { DataSource, EntityTarget, Repository } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }
}
