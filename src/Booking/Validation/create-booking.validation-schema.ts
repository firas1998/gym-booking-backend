import * as joi from '@hapi/joi';

export const CreateBookingValidationSchema = joi.object({
    userId: joi.string().forbidden().allow(null),
    gymId: joi.string().required(),
    datetime: joi.string().required()
});
