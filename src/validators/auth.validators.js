import Joi from "joi";
import ejv from "express-joi-validation";

const validator = ejv.createValidator({});

const userSchema = Joi.object({
    email: Joi.string().min(6).max(90).required().email(),
    password: Joi.string().min(6).max(30).required()
});

const userValidator = validator.body(userSchema);

export const methods = {
    userValidator
};