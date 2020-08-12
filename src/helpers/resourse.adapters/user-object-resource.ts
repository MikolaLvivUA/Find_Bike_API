import { User } from '../../models/user';

export const userObjectResource = (mongoObject: User) => ({
  uuid: mongoObject.userUuid,
  name: mongoObject.userName,
  surname: mongoObject.userSurname,
  email: mongoObject.userEmail,
  phone: mongoObject.userPhone,
  dateOfBirth: mongoObject.userDateOfBirth,
  status: mongoObject.userStatus,
  bikes: mongoObject.userBikes,
  createdAt: mongoObject.userCreatedAt,
});
