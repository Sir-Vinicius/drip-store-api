const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenUtils'); 
const { object } = require('joi');

const getByEmail = async (userEmail) => {
  return await userModel.findOne({
    where: {
      email: userEmail
    }
  })
}

const createUserLogic = async (userData) => {
  const { firstname, surname, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    firstname,
    surname,
    email,
    password: hashedPassword
  });
  return newUser;
}

const updateUserLogic = async (id, firstname, surname, email, password) => {
  try {
    const user = await userModel.findByPk(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const updates = {}

    if (email && user.email !== email) {
      const existingUser = await getByEmail(email)
      if (existingUser) {
        throw new Error('E-mail já esta sendo utulizado');
      }
      updates.email = email       
    }

    if (password) {
      const hashedNewPassword = await bcrypt.hash(password, 10);
      updates.password = hashedNewPassword; 
    }

    if (firstname) {
      updates.firstname = firstname;
    }

    if (surname) {
      updates.surname = surname;
    }

    if(Object.keys(updates).length > 0) {
      await user.update(updates);
    }

    const userWithoutPassword = { ...user};
    delete userWithoutPassword.password;
    return userWithoutPassword;

  } catch (error) {
    throw error; 
  }
};

const authenticateUser = async (email, password) => {
  const user = await getByEmail(email)

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
  if (!isPasswordCorrect) {
    throw new Error('Email ou senha incorretos');
  }

  const token = generateToken(user);
  return { user, token };
};

module.exports = {
  createUserLogic, getByEmail, updateUserLogic, authenticateUser
}