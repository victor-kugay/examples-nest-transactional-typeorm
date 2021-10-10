import {DatabaseModule} from './database/database.module';
import {LoggerModule} from './logger/logger.module';
import {UsersModule} from './users/users.module';
import {CatsModule} from './cats/cats.module';
import {Module} from '@nestjs/common';

@Module({
  imports: [DatabaseModule, LoggerModule, UsersModule, CatsModule],
})
export class AppModule {}
