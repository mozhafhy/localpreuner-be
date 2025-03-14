import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IKonsumenRegistPayload,
  IKonsumenRegistRequest,
} from './interface/konsumen-regist.types';

@Injectable()
export class JwtKonsumenRegistGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request: IKonsumenRegistRequest = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization!;
    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Error, mas');
    }

    try {
      const tokenPayload =
        await this.jwtService.verifyAsync<IKonsumenRegistPayload>(token);

      request.konsumen = {
        email: tokenPayload.email,
        id: tokenPayload.sub,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
  }
}
