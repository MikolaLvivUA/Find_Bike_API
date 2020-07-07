import { IUser } from '../../interfaces';
import { userObjectResourceAdapter } from './user-object-resource.adapter';

export const arrayOfUserObjectsAdapter = (usersArray: [IUser]) => {
    const adaptedArray = [];

    for (const userObject of usersArray) {

        const adaptedUserObject = userObjectResourceAdapter(userObject);

        adaptedArray.push(adaptedUserObject);
    }

    return adaptedArray;
};
