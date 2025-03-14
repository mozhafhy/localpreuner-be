import { Request } from 'express';

export interface IKonsumenRegistPayload {
  sub: string;
  email: string;
}

export interface IKonsumenRegistRequest extends Request {
  konsumen?: {
    id: string;
    email: string;
  };
}
