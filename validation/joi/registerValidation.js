const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(256).required(),
  middleName: Joi.string().min(2).max(256).allow(""),
  lastName: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
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

const validateRegisterSchema = (userInput) =>
  registerSchema.validateAsync(userInput);

module.exports = {
  validateRegisterSchema,
};