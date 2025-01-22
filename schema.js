const Joi = require("joi");

module.exports.ListiningSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image :{
            filename: Joi.string().required(),
            url: Joi.string().required(),

        }
    //    image : Joi.string().required().allow("",null),
    })
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().max(5).min(1),
        comment: Joi.string().required(),
    }).required(),
});