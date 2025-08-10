import Joi from 'joi';
import { enrollmentProductsEnum, genderEnum } from '../../domain/entities/enrollmentSimple.entity';

export const enrollmentSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().min(18).required(),
    gender: Joi.string().valid(...Object.values(genderEnum)),
    monthlyIncome: Joi.number().min(100).required(),
    interest: Joi.string().valid(...Object.values(enrollmentProductsEnum)),
});


export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
