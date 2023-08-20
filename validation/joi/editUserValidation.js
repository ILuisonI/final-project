const Joi = require("joi");

const editSchema = Joi.object({
    firstName: Joi.string().min(2).max(256).required(),
    middleName: Joi.string().min(2).max(256).allow(""),
    lastName: Joi.string().min(2).max(256).required(),
    phone: Joi.string().regex(
        new RegExp(/^[0-9]{9}$/))
        .messages({ 'string.pattern.base': `Phone number must have 9 digits.` })
        .required(),
    email: Joi.string()
        .regex(
            new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        )
        .required(),
    imageUrl: Joi.string().regex(
        new RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
    ),
    imageAlt: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(2).max(256).allow(''),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().allow("", 0),
    isAdmin: Joi.boolean().allow(""),
    isBusiness: Joi.boolean().required(),
});

const validateEditSchema = (userInput) =>
    editSchema.validateAsync(userInput);

module.exports = {
    validateEditSchema,
};