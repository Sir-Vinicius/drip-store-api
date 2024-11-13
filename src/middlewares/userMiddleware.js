const userModel = require('../models/userModel');
const userServices = require('../services/userServices');
const { createSchema, loginSchema, updateSchema } = require('../utils/userSchema')
const jwt = require('jsonwebtoken');

const checkUserExists = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

const validateUserCreate = async (req, res, next) => {
  const { error } = createSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map(err => err.message)
    return res.status(400).json({ error: errorMessages });
  }
  next();
}

const validateUserLogin = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map(err => err.message)
    return res.status(400).json({ error: errorMessages });
  }
  next();
}

const validateUserUpdate = async (req, res, next) => {
  const { error } = updateSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map(err => err.message)
    return res.status(400).json({ error: errorMessages });
  }
  next();
}

const isEmailUsed = async (req, res, next) => {
  const emailUsed = await userServices.getByEmail(req.body.email);
  if (emailUsed) {
    return res.status(400).json({ error: ['Email já está em uso.'] });
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
    console.log(decoded)
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = {
  validateUserCreate, 
  isEmailUsed, 
  authenticateToken, 
  checkUserExists, 
  validateUserLogin, 
  validateUserLogin, 
  validateUserUpdate
};