import * as joi from '@hapi/joi';
import { Gender } from '../Enums/gender.enum';

export const CreateUserValidationSchema = joi.object({
    uuid: joi.string().forbidden().allow(null),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    dateOfBirth: joi.date().required(),
    gender: joi
        .string()
        .required()
        .valid(Gender.MALE, Gender.FEMALE, Gender.OTHER)
});
