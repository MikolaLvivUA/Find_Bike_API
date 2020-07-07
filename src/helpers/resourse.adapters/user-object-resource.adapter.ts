import { IUser } from '../../interfaces';

export const userObjectResourceAdapter = (mongoObject: IUser) => {
    return {
        id: mongoObject._id,
        name: mongoObject.name,
        surname: mongoObject.surname,
        email: mongoObject.email,
        phone: mongoObject.phone,
        dateOfBirth: mongoObject.dateOfBirth.toString(),
        status: mongoObject.status,
        role: mongoObject.role,
        bikes: mongoObject.bikes,
        createdAt: mongoObject.createdAt.toString()
    };
};
