import { UserModel } from '../../database';
import { IUser } from '../../interfaces';

class UserService {
    createUser(user: Partial<IUser>): Promise<IUser> {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    getUserById(userId: string): Promise<IUser> {
        return UserModel.findById(userId) as any;
    }
}

export const userService = new UserService();
