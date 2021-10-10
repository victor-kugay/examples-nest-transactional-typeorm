import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DbConnection} from '../database/database.module';
import {UsersController} from './users.controller';
import {User} from './entities/users/user.entity';
import {UsersService} from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], DbConnection.Users)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
