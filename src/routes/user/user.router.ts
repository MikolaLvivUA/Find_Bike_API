import { Router } from 'express';

import UserController from '../../controllers/user/user.controller';
import UserService from '../../services';
import { checkIsUserValidMiddleware } from '../../middleware';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/', checkIsUserValidMiddleware, userController.createUser);

router.get('/:userId', userController.getUserById.bind(userController));

export const userRouter = router;
