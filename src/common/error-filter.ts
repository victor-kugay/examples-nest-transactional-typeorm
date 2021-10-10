import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {ErrorName, CustomError} from './errors';
import {Request, Response} from 'express';
import {QueryFailedError} from 'typeorm';
import {Logger} from 'nestjs-pino';

type Error = HttpException | CustomError | QueryFailedError | BadRequestException;

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  public catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const resultCode = this.buildResponseResultCode(exception);
    const statusCode = this.buildResponseStatusCode(exception);
    const message = this.buildResponseMessage(exception);

    this.logException(exception);

    response.status(statusCode).json({
      statusCode,
      resultCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private logException(exception: Error) {
    this.logger.error(exception);
  }

  private buildResponseStatusCode(exception: unknown): HttpStatus {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    } else if (exception instanceof CustomError) {
      return HttpStatus.BAD_REQUEST;
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private buildResponseMessage(exception: unknown): string {
    if (exception instanceof HttpException || exception instanceof CustomError) {
      return exception.message;
    } else {
      return ErrorName.ServerError;
    }
  }

  private buildResponseResultCode(exception: unknown): string {
    if (exception instanceof HttpException || exception instanceof CustomError) {
      return exception.message;
    } else {
      return ErrorName.ServerError;
    }
  }
}
