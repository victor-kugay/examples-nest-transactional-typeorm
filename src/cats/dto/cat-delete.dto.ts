import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {ErrorName} from '../../common/errors';
import {Cat} from '../entities/cats/cat.entity';

export class DeleteCatRequestBody {
  @ApiProperty()
  @IsString()
  catId!: string;

  @ApiProperty()
  @IsString()
  userId!: string;
}

export class DeleteCatResponse {
  @ApiProperty({example: 'ok'})
  status!: 'ok';

  @ApiProperty({type: Cat})
  payload!: Cat;
}

export class DeleteCatBadRequestUserDoesntExistResponse {
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

export class DeleteCatBadRequestCatDoesntExistResponse {
  @ApiProperty({example: 400})
  statusCode!: 400;

  @ApiProperty({example: ErrorName.CatDoesntExist})
  resultCode!: ErrorName.CatDoesntExist;

  @ApiProperty({example: ErrorName.CatDoesntExist})
  message!: ErrorName.CatDoesntExist;

  @ApiProperty({example: Date.now()})
  timestamp!: number;

  @ApiProperty()
  path!: string;
}
