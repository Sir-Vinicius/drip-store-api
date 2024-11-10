const productModel = require("../models/productModel")

const create = async (req, res) => {
  try {
    const product = await productModel.create({
      ...req.body
    });

    const productData = product.get({ plain: true });

    res.status(201).json({
      message: `Produto criado com sucesso`,
      product: productData 
    });
  } catch (error) {
    console.error(error); 
    res.status(400).send({
      message: "Erro ao criar o produto.",
      error: error.message || error
    });
  }
}

const getAll = async(req, res) => {
  try {
    const productsList = await productModel.findAll();
    res.status(200).send(productsList)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

const getById = async(req, res) => {
  try{
    const id = req.params.id;
    const product = await productModel.findByPk(Number(id));
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

module.exports = {
  create, getAll, getById
}