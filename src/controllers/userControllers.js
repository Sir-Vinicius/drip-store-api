const userServices = require('../services/userServices')

const getUser = async (req, res) => {
  const { user } = req
  return res.status(200).json(user);
}

const registerUser = async (req, res) => {
  const user = await userServices.createUser(req.body);

  if (!user) {
    return res.status(500).json('Erro no servidor')
  }
  return res.status(201).json(user);
}

// const editUser = async (req, res) => {
//   const id = Number(req.body.id)
//   const updatedUser = await userServices.updateUser(id, req.body);
//   return res.status(200).json(updatedUser);
// }

module.exports = {
  registerUser, getUser, editUser
} 