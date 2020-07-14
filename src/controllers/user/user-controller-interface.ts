import { NextFunction, Request, Response } from 'express';

export interface IUserController {
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
