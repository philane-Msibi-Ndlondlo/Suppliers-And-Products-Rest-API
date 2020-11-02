const Joi = require('@hapi/joi');

const productJoiSchema = Joi.object({
    supplier_id: Joi.number().required(),
    name: Joi.string().required().trim().min(2),
    sku: Joi.string().required().trim().min(2),
    price: Joi.number().required(),
});

module.exports = productJoiSchema;