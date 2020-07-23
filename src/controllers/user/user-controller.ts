import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

import { arrayOfUserObjects, userObjectResource } from '../../helpers';
import { IUserService } from '../../services';
import { ResponseStatusCodesEnum } from '../../constants';
import { IRequestBodyUser, IUser } from '../../interfaces';
import { customErrors } from '../../exceptions';
import { TYPES } from '../../dependency';
import { IUserController } from './user-controller-interface';

@injectable()
class UserController implements IUserController{
    private readonly userService: IUserService;

    constructor(
        @inject(TYPES.userService) userService: IUserService
    ) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const creatingData = req.body as IRequestBodyUser;

        const user = await this.userService.createUser(creatingData);

        const adaptedUserObject = userObjectResource(user);

        res.status(ResponseStatusCodesEnum.CREATED).json({data: adaptedUserObject});
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const { userId } = req.params;

            const user = await this.userService.getUserById(userId) as IUser;

            const adaptedUserObject = userObjectResource(user);

            res.json({data: adaptedUserObject});

        } catch (e) {
            if (e.name === 'UserNotFoundException' || e.message.indexOf('Cast to ObjectId failed')) {
                e.status = ResponseStatusCodesEnum.NOT_FOUND;

                return next(e);
            }
            e.status = ResponseStatusCodesEnum.SERVER;
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {

        const users = await this.userService.getAllUsers();

        const adaptedUsersArray = arrayOfUserObjects(users);

        res.json({data: adaptedUsersArray});

    }

    async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { userId } = req.params;
        const updatingData = req.body as Partial<IRequestBodyUser>;

        const updatedUser = await this.userService.updateUserById(userId, updatingData);

        const adaptedUserObject = userObjectResource(updatedUser);

        res.json({data: adaptedUserObject});
    }

    async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;

            await this.userService.deleteUserById(userId);

            res.status(ResponseStatusCodesEnum.NO_CONTENT).end();

        } catch (e) {
            if (e.code === customErrors.USER_NOT_FOUND.code) {
                e.status = ResponseStatusCodesEnum.NOT_FOUND;
            }
            e.status = ResponseStatusCodesEnum.SERVER;
        }
    }
}

export { UserController };
