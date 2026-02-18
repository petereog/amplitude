const Joi = require('joi');

const schemas = {
  // Data submission schema
  submitData: Joi.object({
    data: Joi.string().required().trim().min(1).max(1000),
    userId: Joi.string().optional().trim(),
    timestamp: Joi.date().optional(),
  }),

  // Add more schemas as needed
  getId: Joi.object({
    id: Joi.string().required().trim(),
  }),
};

module.exports = schemas;
