import { Container } from 'inversify';
import { TYPES } from './types';
import {IUserController} from './interfaces';
import { userController } from './entities';

const myContainer = new Container();
myContainer.bind<IUserController>(TYPES.userController).to(userController);

export { myContainer };
