import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateUserBadRequestResponse, CreateUserSuccessResponse} from './dto/user-create.dto';
import {Body, Controller, Post} from '@nestjs/common';
import {User} from './entities/users/user.entity';
import {UsersService} from './users.service';

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
}
