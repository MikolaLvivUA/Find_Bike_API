import { IBike } from './bike.interface';

export interface IAccessToken {
    _id: string,
    accessToken: string,
    refreshToken: string
    createdAt: string
}

export interface IUser {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    age: string;
    status: string;
    role: string;
    bikes?: [IBike];
    accessTokens?: [IAccessToken];
    createdAt: string;
}
