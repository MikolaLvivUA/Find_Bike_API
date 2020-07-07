import { NextFunction, Request, Response } from 'express';

import { IUser } from '../../interfaces';
import { arrayOfUserObjectsAdapter, HASH_PASSWORD, userObjectResourceAdapter } from '../../helpers';
import UserService from '../../services';
import { ResponseStatusCodesEnum } from '../../constants';

export default class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const creatingData = req.body as IUser;

        creatingData.password = await HASH_PASSWORD(creatingData.password);

        const user = await this.userService.createUser(creatingData);

        const adaptedUserObject = userObjectResourceAdapter(user);

        res.status(ResponseStatusCodesEnum.CREATED).json({data: adaptedUserObject});
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;

        const user = await this.userService.getUserById(userId);

        const adaptedUserObject = userObjectResourceAdapter(user);

        res.json({data: adaptedUserObject});
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const users = await this.userService.getAllUsers() as any; //TODO Think about it

        const adaptedUsersArray = arrayOfUserObjectsAdapter(users);

        res.json({data: adaptedUsersArray});
    }

    async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {

        const {userId} = req.params;
        const updatingData = req.body;

        const updatedUser = await this.userService.updateUserById(userId, updatingData);

        const adaptedUserObject = userObjectResourceAdapter(updatedUser);

        res.json({data: adaptedUserObject});
    }

    async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {userId} = req.params;

        await this.userService.deleteUserById(userId);

        res.status(ResponseStatusCodesEnum.NO_CONTENT).end();
    }
}
