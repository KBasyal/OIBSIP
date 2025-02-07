const Joi = require("joi")

const BaseCreateDTO = Joi.object({
    name:Joi.string().min(2).required(),
    size:Joi.string().pattern(/^(medium|large)$/).default('medium'),
    link:Joi.string().uri().empty(null, "").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    // image: Joi.string()
})
const BaseUpdateDTO = Joi.object({
    name:Joi.string().min(2).required(),
    size:Joi.string().pattern(/^(medium|large)$/).default('medium'),
    link:Joi.string().uri().empty(null, "").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image : Joi.string().empty(null, "").optional().default(null)
    
})
module.exports={
    BaseCreateDTO,
    BaseUpdateDTO
}