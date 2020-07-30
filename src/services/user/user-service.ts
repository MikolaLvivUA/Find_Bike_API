import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { UserModel } from '../../database';
import { User } from '../../models';
import { IRequestBodyUser, IUser } from '../../interfaces';
import { IUserService } from './user-service-interface';
import { IUserRepository } from '../../repositories/user';
import { TYPES } from '../../dependency';
import { UserNotFoundException } from '../../exceptions/user';

@injectable()
class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(
  @inject(TYPES.userRepository) userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  createUser(user: IRequestBodyUser): Promise<IUser> {

    const newUserModel = new User(user);
    newUserModel.uuid = uuidv4();

    const newUser = new UserModel(user);

    return this.userRepository.save(newUser);
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await this.userRepository.byId(userId);

    if (!user) {
      throw new UserNotFoundException('User Not Found');
    }

    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<IUser> {
    const user = await this.getUserById(userId);

    const updatedUser = Object.assign(user, updateData);

    return this.userRepository.save(updatedUser);
  }

  async deleteUserById(userId: string): Promise<void> {
    const user = await this.getUserById(userId);

    return this.userRepository.delete(user);
  }
}

export { UserService };
