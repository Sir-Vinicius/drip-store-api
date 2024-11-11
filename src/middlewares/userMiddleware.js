const userServices = require('../services/userServices');
const userValidation = require('../validation/userValidation')

const checkUserExists = async (req, res, next) => {
  const { id } = req.params;
  try {  
    const user = await userServices.getById(Number(id));  
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const validateUserInput = async (req, res, next) => {
  const { error } = userValidation.validate(req.body, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map(err => err.message)
    return res.status(400).json({ errors: errorMessages });
  }

  const emailUsed = await userServices.getByEmail(req.body.email);
  
  if (emailUsed) {
    return res.status(400).json({ errors: ['Email já está em uso.'] });
  }
  next();
}



module.exports = {
  checkUserExists, validateUserInput
};