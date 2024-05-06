import Joi from "joi";

// schema for validation
export const registerUserSchemaValidator = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


export const loginUserSchemaValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

