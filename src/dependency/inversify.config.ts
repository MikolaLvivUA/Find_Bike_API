import { Container } from 'inversify';

import { TYPES } from './types';
import { IUserController, UserController } from '../controllers/user';
import { IUserService, UserService } from '../services/user';

const myContainer = new Container();
myContainer.bind<IUserController>(TYPES.userController).to(UserController);
myContainer.bind<IUserService>(TYPES.userService).to(UserService);

export { myContainer };
