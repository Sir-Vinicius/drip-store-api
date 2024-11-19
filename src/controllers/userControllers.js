const userModel = require('../models/userModel');
const userServices = require('../services/userServices')

const getUser = async (req, res) => {
  const user = req.user
  
  const userWithoutPassword = {
    id: user.id,
    firstname: user.firstname,
    surname: user.surname,
    email: user.email
  };
  return res.status(200).json(userWithoutPassword);
}

const registerUser = async (req, res) => {
  const user = await userServices.createUserLogic(req.body);

  if (!user) {
    return res.status(500).json('Erro no servidor')
  }
  res.status(201).json({
    message: 'Usuário registrado com sucesso',
    data: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      surname: user.surname
    },
  });
}

const updateUser = async (req, res) => {
  const id = Number(req.user.id);
  const { firstname, surname, email, password } = req.body;

  try {
    const updatedUser = await userServices.updateUserLogic(id, firstname, surname, email, password);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso', updatedUser});

  } catch (error) {
    console.error(error);
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel.findByPk(id);
    if(!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.status(204).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {

    res.status(500).json({ error: 'Erro ao deletar o usuário' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userServices.authenticateUser(email, password);
    res.status(200).json({ message: 'Login com sucesso', token, user });

  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });
    } else if (error.message === 'Email ou senha incorretos') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  registerUser, getUser, updateUser, deleteUser, login
} 