import { UserModel } from '../../database';
import { IUser } from '../../interfaces';

export default class UserService {
    createUser(user: Partial<IUser>): Promise<IUser> {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    getUserById(userId: string): Promise<IUser> {
        return UserModel.findById(userId).select({password: 0}) as any;
    }

    getAllUsers(): Promise<IUser> {
        return UserModel.find().select({password: 0}) as any;
    }

    updateUserById(userId: string, updateData: Partial<IUser>): Promise<IUser> {
        return UserModel.findByIdAndUpdate(userId, updateData, {new: true}) as any;
    }

    deleteUserById(userId: string): Promise<void> {
        return UserModel.findByIdAndDelete(userId) as any;
    }
}
