import { Request } from 'express';

export interface IKonsumenRegistPayload {
  email: string;
  sub: string;
}

export interface IKonsumenRegistRequest extends Request {
  konsumen?: {
    email: string;
    id: string;
  };
}
