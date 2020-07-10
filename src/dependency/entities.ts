import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserController, IUserService } from './interfaces';
import { TYPES } from './types';

@injectable()
class userController implements IUserController {
    userController: any
    constructor(
        @inject(TYPES.userService) userService: IUserService
    ) {}
}

export { userController };
