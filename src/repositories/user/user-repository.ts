import 'reflect-metadata';
import { injectable } from 'inversify';

import { UserModel } from '../../database';
import { IUser } from '../../interfaces';
import { IUserRepository } from './user-repository-interface';
import { UserType } from '../../database/models';

@injectable()
class UserRepository implements IUserRepository{
    save(UserModel: UserType): Promise<IUser> {

        return UserModel.save();
    }

    async byId(userId: string): Promise<IUser | null> {
        const user = await UserModel.findById(userId).exec();

        return user;
    }

    find(params?: Partial<IUser> ): Promise<IUser[] | null> {
        return UserModel.find({ params }).exec();
    }

    deleteUserById(userId: string): Promise<void> {
        return UserModel.findByIdAndDelete(userId) as any;
    }
}

export { UserRepository };
