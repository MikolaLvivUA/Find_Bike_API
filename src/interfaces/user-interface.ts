import { IBike } from './bike-interface';

export interface IUser {
  _id: string;
  uuid: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: string;
  bikes: [IBike];
  createdAt: string;
}

export interface IRequestBodyUser {
  name: string;
  surname: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status?: string;
  role?: string;
  bikes?: [IBike];
}
