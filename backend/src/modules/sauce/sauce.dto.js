const Joi = require("joi")

const SauceCreateDTO = Joi.object({
    name:Joi.string().min(2).required(),
    link:Joi.string().uri().empty(null, "").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    // image: Joi.string()
})
const SauceUpdateDTO = Joi.object({
    name:Joi.string().min(2).required(),
    link:Joi.string().uri().empty(null, "").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image : Joi.string().empty(null, "").optional().default(null)
    
})
module.exports={
    SauceCreateDTO,
    SauceUpdateDTO
}