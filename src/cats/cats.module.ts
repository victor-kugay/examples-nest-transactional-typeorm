import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Cat} from './entities/cats/cat.entity';
import {CatsController} from './cats.controller';
import {User} from '../users/entities/users/user.entity';
import {DbConnection} from '../database/database.module';
import {CatsService} from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat], DbConnection.Cats), TypeOrmModule.forFeature([User], DbConnection.Users)],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [TypeOrmModule],
})
export class CatsModule {}
