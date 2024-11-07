const productModel = require("../models/productModel")

const create = async(req, res) => {
  try {
    const product = await productModel.create({
    ...req.body
    })
    res.status(201).json({
      message: `Produto criado com sucesso:${product}` 
    })
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).send({
      message: "Erro ao criar o produto.",
      error: error.message || error
    });
  }
}

const list = async(req, res) => {
  try {
    const productsList = await productModel.findAll();
    res.status(200).send(productsList)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

module.exports = {
  create, list
}