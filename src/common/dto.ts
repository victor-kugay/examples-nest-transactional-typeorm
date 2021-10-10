import {applyDecorators} from '@nestjs/common';
import {ApiBadRequestResponse, ApiExtraModels, getSchemaPath} from '@nestjs/swagger';

export function ApiBadRequestResponseUnion(types: Array<{type: Function; description: string}>) {
  return applyDecorators(
    ApiExtraModels(...types.map((t) => t.type)),
    ApiBadRequestResponse({
      schema: {
        oneOf: types.map(({type, description}) => ({
          $ref: getSchemaPath(type),
          description,
        })),
      },
    }),
  );
}
