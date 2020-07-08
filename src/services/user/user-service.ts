import { UserModel } from '../../database';
import { IRequestBodyUser, IUser } from '../../interfaces';

export default class UserService {
    createUser(user: IRequestBodyUser): Promise<IUser> {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    getUserById(userId: string): Promise<IUser> {
        return UserModel.findById(userId) as any;
    }

    getAllUsers(): Promise<IUser> {
        return UserModel.find() as any;
    }

    updateUserById(userId: string, updateData: Partial<IRequestBodyUser>): Promise<IUser> {
        return UserModel.findByIdAndUpdate(userId, updateData, {new: true}) as any;
    }

    deleteUserById(userId: string): Promise<void> {
        return UserModel.findByIdAndDelete(userId) as any;
    }
}
