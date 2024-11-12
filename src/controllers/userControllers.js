const userModel = require('../models/userModel');
const userServices = require('../services/userServices')

const getUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userModel.findByPk(id);
  const userWithoutPassword = {
    id: user.id,
    firstname: user.firstname,
    surname: user.surname,
    email: user.email
  };
  return res.status(200).json(userWithoutPassword);
}

const registerUser = async (req, res) => {
  const { newUser, token } = await userServices.createUserLogic(req.body);
  
  if (!newUser) {
    return res.status(500).json('Erro no servidor')
  }
  res.status(201).json({
    message: 'Usuário registrado com sucesso',
    user: {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      surname: newUser.surname
    },
    token
  });
}

const updateUser = async (req, res) => {
  const id = Number(req.user.id);  
  const { firstname, surname, email, password } = req.body;

  try {
    const updatedUser = await userServices.updateUserLogic(id, { firstname, surname, email, password });
    const { password: _, ...userWithoutPassword } = updatedUser;
    return res.status(200).json({ message: 'Usuário atualizado com sucesso', user: userWithoutPassword });

  } catch (error) {
    console.error(error);
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });  
    }
    return res.status(500).json({ error: 'Erro interno no servidor' });  
  }
};

const deleteUser = async (req, res) => {
  const user = req.user;
  try {
    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token } = await userServices.authenticateUser(email, password);
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    } else if (error.message === 'Email ou senha incorretos') {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  registerUser, getUser, updateUser, deleteUser, login
} 