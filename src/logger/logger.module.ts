import {Module} from '@nestjs/common';
import {LoggerModule as NestPinoLoggerModule} from 'nestjs-pino';

@Module({
  imports: [
    NestPinoLoggerModule.forRoot({
      // @See https://github.com/iamolegga/nestjs-pino#synchronous-configuration
      pinoHttp: {prettyPrint: true},
    }),
  ],
})
export class LoggerModule {}
