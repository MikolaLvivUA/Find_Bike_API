import { User } from '../../models/user';

export interface IUserRepository {
  save(user: User): Promise<User>;
  byId(userId: string): Promise<User | null>
  find(params?: Partial<User>): Promise<User[]>;
  delete(user: User): Promise<void>;
}
