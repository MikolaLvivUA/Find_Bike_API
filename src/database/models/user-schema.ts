import {
  Document, Model, model, Schema,
} from 'mongoose';

import { TableNamesEnum, UserStatusEnum } from '../../constants';
import { User } from '../../models/user';

export type UserType = User & Document;

const bikeSubModel = {
  serial_number: String,
  color: String,
  type: String,
  description: String,
  photo: String,
  status: String,
  createdAt: String,
};

export const UserSchema: Schema = new Schema<User>({
  uuid: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  status: {
    type: String,
    default: UserStatusEnum.ACTIVE_STATUS,
  },
  bikes: [bikeSubModel],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export const UserModel: Model<UserType> = model<UserType>(TableNamesEnum.USERS, UserSchema);
