import { UserModel } from '../../database';
import { IUser } from '../../interfaces';

export default class UserService {
    createUser(user: Partial<IUser>): Promise<IUser> {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    getUserById(userId: string): Promise<IUser> {
        return UserModel.findById(userId) as any;
    }
}
