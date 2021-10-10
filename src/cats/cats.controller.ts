import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateCatBadRequestResponse, CreateCatResponse} from './dto/cat-create.dto';
import {Body, Controller, Delete, Post} from '@nestjs/common';
import {ApiBadRequestResponseUnion} from '../common/dto';
import {Cat} from './entities/cats/cat.entity';
import {CatsService} from './cats.service';

import {
  DeleteCatBadRequestCatDoesntExistResponse,
  DeleteCatBadRequestUserDoesntExistResponse,
  DeleteCatRequestBody,
  DeleteCatResponse,
} from './dto/cat-delete.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOkResponse({
    type: CreateCatResponse,
    description: 'Cat has successfully created',
  })
  @ApiBadRequestResponse({
    type: CreateCatBadRequestResponse,
    description: 'User has not enough credits to create cat',
  })
  @ApiOperation({
    operationId: 'createCatAndUpdateUserCredits',
    summary: 'Create cat and update user credits',
  })
  @Post()
  public async createCatAndUpdateUserCredits(@Body() cat: Cat): Promise<CreateCatResponse> {
    const payload = await this.catsService.createCatAndUpdateUserCredits(cat);

    return {status: 'ok', payload};
  }

  @ApiOkResponse({
    type: DeleteCatResponse,
    description: 'Cat has successfully deleted',
  })
  @ApiBadRequestResponseUnion([
    {
      type: DeleteCatBadRequestUserDoesntExistResponse,
      description: 'User doesnt exist',
    },
    {
      type: DeleteCatBadRequestCatDoesntExistResponse,
      description: 'Cat doesnt exist',
    },
  ])
  @ApiOperation({
    operationId: 'deleteCatAndUpdateUserCredits',
    summary: 'Delete users cat',
  })
  @Delete()
  public async deleteCatAndUpdateUserCredits(
    @Body() {userId, catId}: DeleteCatRequestBody,
  ): Promise<CreateCatResponse> {
    const payload = await this.catsService.deleteCatAndUpdateUserCredits(userId, catId);

    return {status: 'ok', payload};
  }
}
