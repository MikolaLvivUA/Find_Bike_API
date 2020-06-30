import * as Joi from 'joi';

import { RegExpEnum } from '../../constants';

export const newUserValidator = Joi.object({
    name: Joi.string().trim().min(2).max(45).required(),
    surname: Joi.string().trim().min(2).max(45).required(),
    email: Joi.string().trim().regex(RegExpEnum.email).required(),
    password: Joi.string().trim().regex(RegExpEnum.password).required(),
    phone: Joi.string().regex(RegExpEnum.phone).required(),
    dateOfBirth: Joi.date()
});
