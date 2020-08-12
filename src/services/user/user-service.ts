import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../models';
import { IRequestBodyUser } from '../../interfaces';
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

  createUser(user: IRequestBodyUser): Promise<User> {
    const uuid = uuidv4();
    const newUserModel = new User(uuid, user.name, user.surname, user.email, user.phone, user.dateOfBirth);

    return this.userRepository.save(newUserModel);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.byId(userId);

    if (!user) {
      throw new UserNotFoundException('User Not Found');
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<User> {
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
