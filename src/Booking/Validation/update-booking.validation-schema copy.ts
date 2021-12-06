import * as joi from '@hapi/joi';

export const UpdateBookingValidationSchema = joi.object({
    datetime: joi.string().required()
});
