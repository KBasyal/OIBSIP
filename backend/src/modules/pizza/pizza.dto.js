const Joi = require("joi");

const PizzaCreateDTO = Joi.object({
    name: Joi.string().min(3).required(),
    size: Joi.string().valid("small", "medium", "large", "extra large").default("medium"),
    base: Joi.string().empty(null, "").optional().default(null),
    topping: Joi.string().optional(),
    cheese: Joi.string().empty(null, "").optional().default(null),
    sauce: Joi.string().empty(null, "").optional().default(null),
    // image: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
    availity: Joi.string().valid("available", "out of stock").default("available"),
    createdBy: Joi.string().empty(null, "").optional().default(null),
    updatedBy: Joi.string().empty(null, "").optional().default(null)
});

const PizzaUpdateDTO = Joi.object({
    name: Joi.string().min(3).optional(),
    size: Joi.string().valid("small", "medium", "large", "extra large").optional(),
    base: Joi.string().empty(null, "").optional().default(null),
    topping: Joi.string().optional(),
    cheese: Joi.string().empty(null, "").optional().default(null),
    sauce: Joi.string().empty(null, "").optional().default(null),
    image: Joi.string().optional(),
    price: Joi.string().optional(),
    description: Joi.string().optional(),
    availity: Joi.string().valid("available", "out of stock").optional(),
    updatedBy: Joi.string().empty(null, "").optional().default(null)
});

module.exports = {
    PizzaCreateDTO,
    PizzaUpdateDTO
};