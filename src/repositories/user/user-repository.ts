import 'reflect-metadata';
import { injectable } from 'inversify';

import { UserModel } from '../../database';
import { IUserRepository } from './user-repository-interface';
import { UserType } from '../../database/models';
import { User } from '../../models/user';

@injectable()
class UserRepository implements IUserRepository {
  save(user: UserType): Promise<User> {
    const NewUser = new UserModel(user);
    return NewUser.save();
  }

  async byId(userId: string): Promise<User | null> {
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

  find(params?: Partial<User>): Promise<User[]> {
    return UserModel.find({ params }).exec();
  }

  async delete(user: User): Promise<void> {
    // eslint-disable-next-line no-underscore-dangle
    await UserModel.deleteOne({ _id: user.userUuid });
  }
}

export { UserRepository };
