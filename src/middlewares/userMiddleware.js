const userModel = require('../models/userModel');
const userServices = require('../services/userServices');
const userSchema = require('../validation/userSchema')
const jwt = require('jsonwebtoken');

const checkUserExists = async (req, res, next) => {
  const { id } = req.user;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' }); 
  }

  try {  
    const user = await userModel.findByPk(Number(id));
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const validateUserInput = async (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map(err => err.message)
    return res.status(400).json({ errors: errorMessages });
  }
  next();
}

const isEmailUsed = async (req, res, next) => {
  const emailUsed = await userServices.getByEmail(req.body.email);
  if (emailUsed) {
    return res.status(400).json({ errors: ['Email já está em uso.'] });
  }
  next();
}

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = {
  checkUserExists, validateUserInput, isEmailUsed, authenticateToken
};