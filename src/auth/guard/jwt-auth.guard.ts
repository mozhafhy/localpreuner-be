import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IKonsumenRequest } from '../auth.types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request: IKonsumenRequest = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization!;
    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload =
        await this.jwtService.verifyAsync<IJwtPayload>(token);
      request.konsumen = {
        id: tokenPayload.sub,
        username: tokenPayload.username,
        umkmID: tokenPayload.umkmID,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
