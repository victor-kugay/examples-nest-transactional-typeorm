import {Injectable} from '@nestjs/common';
import {UserAlreadyExists} from '../common/errors';
import {DbConnection} from '../database/database.module';
import {User} from './entities/users/user.entity';
import {getManager} from 'typeorm';

@Injectable()
export class UsersService {
  public async createUserIfNotExists(user: User): Promise<User> {
    return await getManager(DbConnection.Users).transaction(async (manager) => {
      const isUserExist = await manager.findOne(User, user.id);
      if (isUserExist) {
        throw new UserAlreadyExists();
      }

      return await manager.save(User, user);
    });
  }
}
