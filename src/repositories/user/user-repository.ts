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

    find(params?: Partial<IUser> ): Promise<IUser[]> {
        return UserModel.find({ params }).exec();
    }

    delete(params: Partial<IUser>): Promise<void> {
        return UserModel.deleteOne(params) as any;
    }
}

export { UserRepository };
