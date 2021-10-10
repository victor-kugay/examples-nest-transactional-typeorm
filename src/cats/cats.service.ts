import {DbConnection} from '../database/database.module';
import {User} from '../users/entities/users/user.entity';
import {CatDoesntExist, UserDoesntExist, UserHasNotEnoughCredits} from '../common/errors';
import {InjectConnection, InjectEntityManager} from '@nestjs/typeorm';
import {Connection, EntityManager} from 'typeorm';
import {AppConfig} from '../configs/app-config';
import {Cat} from './entities/cats/cat.entity';
import {Injectable} from '@nestjs/common';

const {APP_DAY_PRICE_IN_CREDITS} = AppConfig;

@Injectable()
export class CatsService {
  constructor(
    @InjectConnection(DbConnection.Cats) private readonly catsConnection: Connection,
    @InjectConnection(DbConnection.Users) private readonly usersConnection: Connection,
    @InjectEntityManager(DbConnection.Cats) private readonly catsManager: EntityManager,
    @InjectEntityManager(DbConnection.Users) private readonly usersManager: EntityManager,
  ) {}

  // === Examples: createQueryRunner ===

  public async createCatAndUpdateUserCredits(cat: Cat): Promise<Cat> {
    const queryRunnerUsers = this.usersConnection.createQueryRunner();
    const queryRunnerCats = this.catsConnection.createQueryRunner();

    const user = await queryRunnerUsers.manager.findOneOrFail(User, cat.userId);

    if (user.credits < APP_DAY_PRICE_IN_CREDITS) {
      throw new UserHasNotEnoughCredits();
    }

    await queryRunnerCats.startTransaction();
    await queryRunnerUsers.startTransaction();

    try {
      await queryRunnerUsers.manager.update(User, cat.userId, {
        credits: user.credits - APP_DAY_PRICE_IN_CREDITS,
      });

      const catEntity = await queryRunnerCats.manager.save(Cat, cat);

      await queryRunnerUsers.commitTransaction();
      await queryRunnerCats.commitTransaction();

      return catEntity;
    } catch (error) {
      await queryRunnerCats.rollbackTransaction();
      await queryRunnerUsers.rollbackTransaction();

      throw error;
    } finally {
      await queryRunnerCats.release();
      await queryRunnerUsers.release();
    }
  }

  // === Examples: InjectEntityManager ===

  public async deleteCatAndUpdateUserCredits(userId: string, catId: string): Promise<Cat> {
    const user = await this.usersManager.findOne(User, userId);
    if (!user) {
      throw new UserDoesntExist();
    }

    const cat = await this.catsManager.findOne(Cat, catId);
    if (!cat) {
      throw new CatDoesntExist();
    }

    await this.catsManager.delete(Cat, cat);

    return cat;
  }
}
