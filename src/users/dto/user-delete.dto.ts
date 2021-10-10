import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {ErrorName} from '../../common/errors';
import {User} from '../entities/users/user.entity';

export class DeleteUserRequestBody {
  @ApiProperty()
  @IsString()
  userId!: string;
}

export class DeleteUserResponse {
  @ApiProperty({example: 'ok'})
  status!: 'ok';

  @ApiProperty({type: User})
  payload!: User;
}

export class DeleteUserBadRequestUserDoesntExistResponse {
  @ApiProperty({example: 400})
  statusCode!: 400;

  @ApiProperty({example: ErrorName.UserDoesntExist})
  resultCode!: ErrorName.UserDoesntExist;

  @ApiProperty({example: ErrorName.UserDoesntExist})
  message!: ErrorName.UserDoesntExist;

  @ApiProperty({example: Date.now()})
  timestamp!: number;

  @ApiProperty()
  path!: string;
}
