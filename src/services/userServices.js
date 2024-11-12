const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../validation/tokenUtils'); 

const getByEmail = async (userEmail) => {
  return await userModel.findOne({
    where: {
      email: userEmail
    }
  })
}

const createUserLogic = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await userModel.create({
    ...userData,
    password: hashedPassword
  });
  const token = generateToken(newUser);
  return { newUser, token };
}

const updateUserLogic = async (id, { firstname, surname, email, password }) => {
  try {
    const user = await userModel.findByPk(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (password) {
      const hashedNewPassword = await bcrypt.hash(password, 10);
      user.password = hashedNewPassword; 
    }

    user.firstname = firstname || user.firstname;  
    user.surname = surname || user.surname;        
    user.email = email || user.email;             

    await user.save();

    return user;  
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