import { NextFunction, Request, Response, Router } from 'express';

// import UserController from '../../controllers/user/user-controller';
// import UserService from '../../services';
import { myContainer } from '../../dependency/inversify.config';
import { TYPES } from '../../dependency/types';
import { IUserController } from '../../dependency/interfaces';

const userController = myContainer.get<IUserController>(TYPES.userController);

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
