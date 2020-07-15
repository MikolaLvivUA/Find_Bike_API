import { Container } from 'inversify';

import { TYPES } from './types';
import { IUserController, UserController } from '../controllers/user';
import { IUserService, UserService } from '../services/user';
import { IUserRepository, UserRepository } from '../repositories/user';

const myContainer = new Container();
myContainer.bind<IUserController>(TYPES.userController).to(UserController);
myContainer.bind<IUserService>(TYPES.userService).to(UserService);
myContainer.bind<IUserRepository>(TYPES.userRepository).to(UserRepository);

export { myContainer };
