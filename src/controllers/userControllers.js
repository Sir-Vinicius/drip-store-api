const userModel = require('../models/userModel');

const getById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await userModel.findByPk(Number(id))
    console.log(user)
    return res.status(200).json(user)
  } catch(error) {
    return res.status(404)
  }
}

const create = async (req, res) => {

  const user = await userModel.create({...req.body})
  res.status(201).json(user)
}

module.exports = {
  create, getById
}