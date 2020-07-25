import { IUser } from '../../interfaces';

export interface IUserRepository {
  save(user: IUser): Promise<IUser>;
  byId(userId: string): Promise<IUser | null>
  find(params?: Partial<IUser>): Promise<IUser[]>;
  delete(user: IUser): Promise<void>;
}
