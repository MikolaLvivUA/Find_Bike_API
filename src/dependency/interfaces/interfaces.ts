import UserController from '../../controllers/user/user-controller';
import UserService from '../../services/user';

export interface IUserController {
    userController: UserController
}

export interface IUserService {
    userService: UserService
}
