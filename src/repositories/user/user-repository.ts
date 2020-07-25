import 'reflect-metadata';
import { injectable } from 'inversify';

import { UserModel } from '../../database';
import { IUser } from '../../interfaces';
import { IUserRepository } from './user-repository-interface';
import { UserType } from '../../database/models';

@injectable()
class UserRepository implements IUserRepository {
  save(user: UserType): Promise<IUser> {
    return user.save();
  }

  async byId(userId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId).exec();

      return user;
    } catch (e) {
      if (e.message.indexOf('Cast to ObjectId failed')) {
        return null;
      }
      return null;
    }
  }

  find(params?: Partial<IUser>): Promise<IUser[]> {
    return UserModel.find({ params }).exec();
  }

  async delete(user: IUser): Promise<void> {
    // eslint-disable-next-line no-underscore-dangle
    await UserModel.deleteOne({ _id: user._id });
  }
}

export { UserRepository };
