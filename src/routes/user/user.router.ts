import { NextFunction, Request, Response, Router } from 'express';

import UserController from '../../controllers/user/user.controller';
import UserService from '../../services';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/',
    (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next));

router.get('/:userId',
    (req: Request, res: Response, next: NextFunction) => userController.getUserById(req, res, next));

router.get('/',
    (req: Request, res: Response, next: NextFunction) => userController.getAllUsers(req, res, next));

router.patch('/:userId',
    (req: Request, res: Response, next: NextFunction) => userController.updateUserById(req, res, next));

router.delete('/:userId',
    (req: Request, res: Response, next: NextFunction) => userController.deleteUserById(req, res, next));

export const userRouter = router;
