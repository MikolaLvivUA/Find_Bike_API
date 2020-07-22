export class UserNotFoundException extends Error {
    name = 'UserNotFoundException';

    constructor(msg: string) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
    }
}
