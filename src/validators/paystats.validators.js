import Joi from "joi";
import joiPc from "joi-postalcode";
import ejv from "express-joi-validation";

const joiPostalCode = Joi.extend(joiPc);
const validator = ejv.createValidator({});

const querySchema = Joi.object({
    from: Joi.date().iso(),
    to: Joi.date().iso().min(Joi.ref("from")),
    postalCode: joiPostalCode.string().postalCode("ES")
});

const queryValidator = validator.query(querySchema);

export const methods = {
    queryValidator
};