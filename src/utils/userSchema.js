const Joi = require('joi');

const lettersWithAccentsRegex = new RegExp('^[a-zA-ZáàäâãåÁÀÄÂÃÅéèëêÉÈËÊíìïîÍÌÏÎóòöôõÓÒÖÔÕúùüûÚÙÜÛñÑ]+$');
const surNameRegex = /^[A-Za-zÀ-ÿа-яА-ЯґєіїЇЄа-яёЁ]+(?: [A-Za-zÀ-ÿа-яА-ЯґєіїЇЄа-яёЁ]+)*$/;

const createSchema = Joi.object({
  firstname: Joi.string()
    .min(1)
    .max(20)
    .required()
    .pattern(surNameRegex)
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
    .pattern(surNameRegex)
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
    .required()
    .messages({
      'string.min': 'senha deve ter pelo menos 6 caracteres', 
      'string.empty': 'Insira sua senha', 
      'any.required': 'senha é um campo obrigatório' 
    })
})

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'O email fornecido não é válido.',
      'any.required': 'O email é obrigatório.',
      'string.empty': 'Insira seu email' 
    }),

  password: Joi.string()
    .min(6) 
    .max(30)
    .required()
    .messages({
      'string.min': 'A senha deve ter pelo menos 6 caracteres.',
      'any.required': 'Insira sua senha.',
      'string.empty': 'A senha não pode estar vazia.'
    })
})

const updateSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'O email fornecido não é válido.'
  }),
  firstname: Joi.string().optional().messages({
    'string.empty': 'O primeiro nome não pode estar vazio.'
  }),
  surname: Joi.string().optional().messages({
    'string.empty': 'O sobrenome não pode estar vazio.'
  }),
  password: Joi.string().min(6).max(30).optional().messages({
    'string.min': 'A senha deve ter pelo menos 6 caracteres.',
    'string.max': 'A senha deve ter no máximo 30 caracteres.'
  })
});


module.exports = {
  createSchema, loginSchema, updateSchema
}
