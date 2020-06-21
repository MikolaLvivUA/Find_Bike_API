import { Request, Response } from 'express';
import { IUser } from '../../interfaces';
import { HASH_PASSWORD } from '../../helpers';
import { userService } from '../../services';
import { ResponseStatusCodesEnum } from '../../constants';

class UserController {
    async createUser(req: Request, res: Response) {
        const user = req.body as IUser;

        user.password = await HASH_PASSWORD(user.password);

        await userService.createUser(user);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    async getUserById(req: Request, res: Response) {
        const { userId } = req.params;

        const user = await userService.getUserById(userId);

        res.json({data: user});
    }
}

export const userController = new UserController();
