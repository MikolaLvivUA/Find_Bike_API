import { IRequestBodyUser, IUser } from '../../interfaces';

export interface IUserService {
  createUser(user: IRequestBodyUser): Promise<IUser>;
  getUserById(userId: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
  updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<IUser>;
  deleteUserById(userId: string): Promise<void>;
}
