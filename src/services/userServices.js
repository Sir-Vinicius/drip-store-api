const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getById = async (id) => {
  const user = await userModel.findByPk(id, {
    attributes: ['id', 'firstname', 'surname', 'email'] 
  });

  return user ? user.toJSON() : null;
}

const getByEmail = async (userEmail) => {
  return await userModel.findOne({
    where: {
      email: userEmail
    }
  })
}

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await userModel.create({
    ...userData,
    password: hashedPassword
  });
  return newUser;
}

const updateUser = async (id, userData) => {
  const user = await userModel.findByPk(id); 
  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
  }
  user.set({...userData})
  user.save();
}


module.exports = {
  getById, createUser, getByEmail, updateUser
}