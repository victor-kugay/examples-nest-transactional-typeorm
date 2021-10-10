import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateUserBadRequestResponse, CreateUserSuccessResponse} from './dto/user-create.dto';
import {Body, Controller, Delete, Post} from '@nestjs/common';
import {User} from './entities/users/user.entity';
import {UsersService} from './users.service';
import {
  DeleteUserBadRequestUserDoesntExistResponse,
  DeleteUserRequestBody,
  DeleteUserResponse,
} from './dto/user-delete.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: CreateUserSuccessResponse,
    description: 'User has successfully created',
  })
  @ApiBadRequestResponse({
    type: CreateUserBadRequestResponse,
    description: 'User already exists error',
  })
  @ApiOperation({
    operationId: 'createUserIfNotExists',
    summary: 'Create user if not exists',
  })
  @Post()
  public async createUserIfNotExists(@Body() user: User): Promise<CreateUserSuccessResponse> {
    const payload = await this.usersService.createUserIfNotExists(user);

    return {status: 'ok', payload};
  }

  @ApiOkResponse({
    type: DeleteUserResponse,
    description: 'User has successfully deleted',
  })
  @ApiBadRequestResponse({
    type: DeleteUserBadRequestUserDoesntExistResponse,
    description: 'User doesnt exist',
  })
  @ApiOperation({
    operationId: 'deleteUserIfExists',
    summary: 'Delete user if not exists',
  })
  @Delete()
  public async deleteUserIfExists(@Body() {userId}: DeleteUserRequestBody): Promise<DeleteUserResponse> {
    const payload = await this.usersService.deleteUserIfExists(userId);

    return {status: 'ok', payload};
  }
}
