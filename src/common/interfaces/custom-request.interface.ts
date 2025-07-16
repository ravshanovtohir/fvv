import { Request } from 'express';

export interface IUser {
  id: number;
  role: number;
}

export class IRequest extends Request {
  user: IUser;
}
