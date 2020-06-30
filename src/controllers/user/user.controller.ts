import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../interfaces';
import { HASH_PASSWORD } from '../../helpers';
import UserService from '../../services';
import { ResponseStatusCodesEnum } from '../../constants';

export default class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body as IUser;

            user.password = await HASH_PASSWORD(user.password);

            await this.userService.createUser(user);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {

            next(e);
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;

        const user = await this.userService.getUserById(userId);

        res.json({data: user});
    }
}
