const Joi = require('@hapi/joi');

const supplierJoiSchema = Joi.object({
    name: Joi.string().required().trim().min(2),
    location: Joi.string().required().trim().min(2),
    contactInfo: Joi.string().required().trim().min(2),
});

module.exports = supplierJoiSchema;