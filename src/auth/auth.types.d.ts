import { Request } from 'express';

export interface IJwtPayload {
  username: string;
  sub: string;
  umkmID: string;
}

export interface IKonsumenRequest extends Request {
  konsumen?: {
    id: string;
    username: string;
    umkmID: string;
  };
}
