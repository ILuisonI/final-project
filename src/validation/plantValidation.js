import Joi from "joi";
import validation from "./validation";

const plantSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().min(9).max(9).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    web: Joi.string().min(5).max(1024).allow(""),
    price: Joi.number().min(1).required(),
    imageUrl: Joi.string().min(6).max(1024).allow(""),
    imageAlt: Joi.string().min(2).max(256).allow(""),
});

const plantParamSchema = Joi.object({
    id: Joi.number().min(1).required()
});

const validatePlantSchema = (userInput) => validation(plantSchema, userInput);
const validatePlantParamSchema = (userInput) => {
    validation(plantParamSchema, userInput);
};

export { validatePlantParamSchema };

export default validatePlantSchema;