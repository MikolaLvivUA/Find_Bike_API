import { Document, Model, model, Schema } from 'mongoose';

import { IUser } from '../../interfaces';
import { TableNamesEnum, UserStatusEnum } from '../../constants';

export type UserType = IUser & Document;

const bikeSubModel = {
    serial_number: String,
    color: String,
    type: String,
    description: String,
    photo: String,
    status: String,
    createdAt: String
};

const accessTokenSubModel = {
    accessToken: String,
    refreshToken: String,
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
};

export const UserSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    dateOfBirth: {
        type: Date },
    status: {
        type: String,
        required: true,
        default: UserStatusEnum.ACTIVE_STATUS
    },
    role: {
        type: String
    },
    Bikes: [bikeSubModel],
    accessTokens: [accessTokenSubModel],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }

});

export const UserModel: Model<UserType> = model<UserType>(TableNamesEnum.USERS, UserSchema);
