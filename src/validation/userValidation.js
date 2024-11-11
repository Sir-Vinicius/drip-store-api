const Joi = require('joi');

const lettersWithAccentsRegex = new RegExp('^[a-zA-ZáàäâãåÁÀÄÂÃÅéèëêÉÈËÊíìïîÍÌÏÎóòöôõÓÒÖÔÕúùüûÚÙÜÛñÑ]+$');
// const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]*$')
const userSchema = Joi.object({
  firstname: Joi.string()
    .min(1)
    .max(20)
    .required()
    .pattern(lettersWithAccentsRegex)
    .messages({
      'string.pattern.base': 'O primeiro nome deve conter apenas letras e acentos válidos.',
      'any.required': 'O primeiro nome é obrigatório.',
      'string.max': 'O primeiro nome deve ter no máximo 20 caracteres.',
      'string.min': 'O primeiro nome deve ter pelo menos 1 caractere.',
    }),

  surname: Joi.string()
    .min(1)
    .max(20)
    .required()
    .pattern(lettersWithAccentsRegex)
    .messages({
      'string.pattern.base': 'O sobrenome nome deve conter apenas letras e acentos válidos.',
      'any.required': 'O sobrenome nome é obrigatório.',
      'string.max': 'O sobrenome nome deve ter no máximo 20 caracteres.',
      'string.min': 'O sobrenome nome deve ter pelo menos 1 caractere.',
    }),
  
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'O email fornecido não é válido.',
      'any.required': 'O email é obrigatório.',
    }),

  password: Joi.string()
    .min(6) 
    .max(30)
    .required()
})
module.exports = userSchema;
