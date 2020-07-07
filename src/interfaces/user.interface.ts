import { IBike } from './bike.interface';

export interface IUser {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string;
    status: string;
    role: string;
    bikes?: [IBike];
    createdAt: string;
}
