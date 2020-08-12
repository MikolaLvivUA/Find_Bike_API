import { IRequestBodyUser } from '../../interfaces';
import { User } from '../../models/user';

export interface IUserService {
  createUser(user: IRequestBodyUser): Promise<User>;
  getUserById(userId: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<User>;
  deleteUserById(userId: string): Promise<void>;
}
