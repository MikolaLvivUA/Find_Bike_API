import { IUser } from '../../interfaces';
import { userObjectResource } from './user-object-resource';

export const arrayOfUserObjects = (usersArray: IUser[]) => usersArray.map(userObjectResource);
