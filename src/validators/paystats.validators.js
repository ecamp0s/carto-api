const Joi = require("joi");
const joiPostalCode = Joi.extend(require("joi-postalcode"));
const validator = require("express-joi-validation").createValidator({});

const querySchema = Joi.object({
    from: Joi.date().iso(),
    to: Joi.date().iso().min(Joi.ref("from")),
    postalCode: joiPostalCode.string().postalCode("ES")
});

const queryValidator = validator.query(querySchema);

export const methods = {
    queryValidator
};