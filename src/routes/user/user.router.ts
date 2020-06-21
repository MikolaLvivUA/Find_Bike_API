import { Router } from 'express';

import { userController } from '../../controllers';

const router = Router();

router.post('/', userController.createUser);

router.get('/:userId', userController.getUserById);

export const userRouter = router;
