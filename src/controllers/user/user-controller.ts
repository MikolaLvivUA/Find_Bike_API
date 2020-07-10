import { NextFunction, Request, Response } from 'express';

import { arrayOfUserObjects, userObjectResource } from '../../helpers';
import UserService from '../../services';
import { ResponseStatusCodesEnum } from '../../constants';
import { IRequestBodyUser } from '../../interfaces';
import { customErrors, ErrorHandler } from '../../errors';

export default class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const creatingData = req.body as IRequestBodyUser;

        const user = await this.userService.createUser(creatingData);

        const adaptedUserObject = userObjectResource(user);

        res.status(ResponseStatusCodesEnum.CREATED).json({data: adaptedUserObject});
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;

        const user = await this.userService.getUserById(userId);

        if (!user) {
            return next(
                new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    customErrors.NOT_FOUND.message,
                    customErrors.NOT_FOUND.code
                )
            );
        }

        const adaptedUserObject = userObjectResource(user);

        res.json({data: adaptedUserObject});
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const users = await this.userService.getAllUsers() as any; //TODO Think about it

        const adaptedUsersArray = arrayOfUserObjects(users);

        res.json({data: adaptedUsersArray});
    }

    async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {

        const {userId} = req.params;
        const updatingData = req.body as Partial<IRequestBodyUser>;

        const updatedUser = await this.userService.updateUserById(userId, updatingData);

        const adaptedUserObject = userObjectResource(updatedUser);

        res.json({data: adaptedUserObject});
    }

    async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {userId} = req.params;

        await this.userService.deleteUserById(userId);

        res.status(ResponseStatusCodesEnum.NO_CONTENT).end();
    }
}
