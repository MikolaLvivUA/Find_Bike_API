import { inject ,injectable } from 'inversify';
import 'reflect-metadata';

import { UserModel } from '../../database';
import { IRequestBodyUser, IUser } from '../../interfaces';
import { IUserService } from './user-service-interface';
import { IUserRepository } from '../../repositories/user';
import { TYPES } from '../../dependency';
import { UserNotFoundException } from '../../exceptions/user';
import { ResponseStatusCodesEnum } from '../../constants';
import { customErrors } from '../../exceptions';

@injectable()
class UserService implements IUserService{
    private readonly userRepository: IUserRepository

    constructor(
        @inject(TYPES.userRepository) userRepository: IUserRepository
    ) {
        this.userRepository = userRepository;
    }
    createUser(user: IRequestBodyUser): Promise<IUser> {
        const newUser = new UserModel(user);

        return this.userRepository.save(newUser);
    }

    async getUserById(userId: string): Promise<IUser> {

        const user = await this.userRepository.byId(userId);

        if (!user) {
            throw new UserNotFoundException(
                ResponseStatusCodesEnum.NOT_FOUND,
                customErrors.USER_NOT_FOUND.message,
                customErrors.USER_NOT_FOUND.code
            );
        }

        return user;
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await this.userRepository.find();

        if (!users) {
            throw new UserNotFoundException(
                ResponseStatusCodesEnum.NOT_FOUND,
                customErrors.USER_NOT_FOUND.message,
                customErrors.USER_NOT_FOUND.code
            );
        }

        return users;

    }

    async updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<IUser> {
        const user = await this.getUserById(userId);

        const updatedUser = Object.assign(user, updateData);

        return this.userRepository.save(updatedUser);
    }

    deleteUserById(userId: string): Promise<void> {
        return this.userRepository.deleteUserById(userId);
    }
}

export { UserService };
