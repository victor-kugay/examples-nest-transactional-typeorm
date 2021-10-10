import {Injectable} from '@nestjs/common';
import {UserAlreadyExists, UserDoesntExist} from '../common/errors';
import {DbConnection} from '../database/database.module';
import {User} from './entities/users/user.entity';
import {getManager, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User, DbConnection.Users) private readonly usersRepo: Repository<User>) {}

  // === Examples: InjectRepository ===

  public async deleteUserIfExists(userId: string, transaction: boolean = true): Promise<User> {
    const user = await this.usersRepo.findOne(userId, {transaction});
    if (!user) {
      throw new UserDoesntExist();
    }

    await this.usersRepo.remove(user, {transaction});

    return user;
  }

  // === Examples: getManager ===

  public async createUserIfNotExists(user: Partial<User>): Promise<User> {
    return await getManager(DbConnection.Users).transaction(async (manager) => {
      const isUserExist = await manager.findOne(User, user.id);
      if (isUserExist) {
        throw new UserAlreadyExists();
      }

      return await manager.save(User, user);
    });
  }
}
