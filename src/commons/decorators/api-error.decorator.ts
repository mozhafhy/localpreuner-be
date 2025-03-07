import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dtos/error-response.dto';
export function ApiErrorDecorator(
  statusCode: HttpStatus,
  message: string,
  description?: string,
  error?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: description,
      schema: {
        default: {
          message: message,
          error: error,
          statusCode: statusCode,
        },
        type: getSchemaPath(ErrorResponseDto),
      },
    }),
  );
}
