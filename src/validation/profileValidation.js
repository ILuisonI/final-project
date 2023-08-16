import Joi from "joi";
import validation from "./validation";

const profileSchema = Joi.object({
    firstName: Joi.string().min(2).max(256).required(),
    middleName: Joi.string().min(2).max(256).allow(''),
    lastName: Joi.string().min(2).max(256).required(),
    phone: Joi.string().min(9).max(14).required(),
    email: Joi.string().min(6).max(256).email({ tlds: { allow: false } }).required(),
    imageUrl: Joi.string().min(6).max(1024).allow(''),
    imageAlt: Joi.string().min(6).max(1024).allow(''),
    state: Joi.string().min(2).max(256).allow(''),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(2).max(256).required(),
    zip: Joi.number().min(1).max(99999999).allow(''),
    isBusiness: Joi.boolean().required(),
});

const validateProfileSchema = (userInput) => validation(profileSchema, userInput);

export default validateProfileSchema;