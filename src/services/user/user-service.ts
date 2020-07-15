import { inject ,injectable } from 'inversify';
import 'reflect-metadata';

import { IRequestBodyUser, IUser } from '../../interfaces';
import { IUserService } from './user-service-interface';
import { IUserRepository } from '../../repositories/user';
import { TYPES } from '../../dependency';

@injectable()
class UserService implements IUserService{
    private readonly _userRepository: IUserRepository

    constructor(
        @inject(TYPES.userRepository) userRepository: IUserRepository
    ) {
        this._userRepository = userRepository;
    }
    createUser(user: IRequestBodyUser): Promise<IUser> {
        return this._userRepository.createUser(user);
    }

    getUserById(userId: string): Promise<IUser> {
        return this._userRepository.getUserById(userId);
    }

    getAllUsers(): Promise<IUser[]> {
        return this._userRepository.getAllUsers();
    }

    updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<IUser> {
        return this._userRepository.updateUserById(userId, updateData);
    }

    deleteUserById(userId: string): Promise<void> {
        return this._userRepository.deleteUserById(userId);
    }
}

export { UserService };
