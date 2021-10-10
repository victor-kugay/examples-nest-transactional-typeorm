import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateCatBadRequestResponse, CreateCatResponse} from './dto/cat-create.dto';
import {Body, Controller, Post} from '@nestjs/common';
import {Cat} from './entities/cats/cat.entity';
import {CatsService} from './cats.service';

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
  public async queryRunner(@Body() cat: Cat): Promise<CreateCatResponse> {
    const payload = await this.catsService.createCatAndUpdateUserCredits(cat);

    return {status: 'ok', payload};
  }
}
