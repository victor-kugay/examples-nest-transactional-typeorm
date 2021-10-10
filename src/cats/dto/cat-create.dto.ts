import {Cat} from '../entities/cats/cat.entity';
import {ApiProperty} from '@nestjs/swagger';
import { ErrorName } from '../../common/errors';

export class CreateCatResponse {
  @ApiProperty({example: 'ok'})
  status!: 'ok';

  @ApiProperty({type: Cat})
  payload!: Cat;
}

export class CreateCatBadRequestResponse {
  @ApiProperty({example: 400})
  statusCode!: 400;

  @ApiProperty({example: ErrorName.UserHasNotEnoughCredits})
  resultCode!: ErrorName.UserHasNotEnoughCredits;

  @ApiProperty({example: ErrorName.UserHasNotEnoughCredits})
  message!: ErrorName.UserHasNotEnoughCredits;

  @ApiProperty({example: Date.now()})
  timestamp!: number;

  @ApiProperty()
  path!: string;
}
