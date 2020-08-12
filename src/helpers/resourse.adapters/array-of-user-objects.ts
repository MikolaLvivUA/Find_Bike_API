import { userObjectResource } from './user-object-resource';
import { User } from '../../models/user';

export const arrayOfUserObjects = (usersArray: User[]) => usersArray.map(userObjectResource);
