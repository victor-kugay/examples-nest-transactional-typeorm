import {ApiProperty} from '@nestjs/swagger';
import {ErrorName} from '../../common/errors';
import {User} from '../entities/users/user.entity';

export class CreateUserSuccessResponse {
  @ApiProperty({example: 'ok'})
  status!: 'ok';

  @ApiProperty({type: User})
  payload!: User;
}

export class CreateUserBadRequestResponse {
  @ApiProperty({example: 400})
  statusCode!: 400;

  @ApiProperty({example: ErrorName.UserAlreadyExists})
  resultCode!: ErrorName.UserAlreadyExists;

  @ApiProperty({example: ErrorName.UserAlreadyExists})
  message!: ErrorName.UserAlreadyExists;

  @ApiProperty({example: Date.now()})
  timestamp!: number;

  @ApiProperty()
  path!: string;
}
