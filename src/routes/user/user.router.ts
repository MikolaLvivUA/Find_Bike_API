import { NextFunction, Request, Response, Router } from 'express';

import UserController from '../../controllers/user/user.controller';
import UserService from '../../services';
// import { checkIsUserValidMiddleware } from '../../middleware';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/', /*checkIsUserValidMiddleware,*/
    (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next));

router.get('/:userId',
    (req: Request, res: Response, next: NextFunction) => userController.getUserById(req, res, next));

export const userRouter = router;
