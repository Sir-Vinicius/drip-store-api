const productModel = require("../models/productModel")
const productServices = require('../services/productServices')
const { commonIncludes }  = require('../services/productServices');
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

const getById = async(req, res) => {
  try{
    const id = req.params.id;
    const product = await productModel.findByPk(Number(id), {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: commonIncludes
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

const getAll = async (req, res) => {
  try {
    const { limit, page, fields, price_range, mark } = req.query;

    const params = {
      limit: limit === undefined ? -1 : parseInt(limit), 
      page: page || 1,          
      fields: fields || 'id,name,price,price_with_discount,mark,colors',
      price_range: price_range || '', 
      mark: mark || ''
    };

    const result = await productServices.searchProductsLogic(params);

    res.status(200).json(result);
  } catch (error) {

    console.error('Error in searchProductsController:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};

const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id);

  const {
    enabled,
    name,
    slug,
    stock,
    mark,
    description,
    price,
    price_with_discount,
    images,
  } = req.body;

  const productData = {
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    mark
  };

  try {
    const result = await productServices.updateProductLogic(productId, productData, images);
    return res.status(200).json({ message: 'Product alterado com sucesso', data: result });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message});
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    
    const product = await productModel.findByPk(Number(id));

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    await product.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};


module.exports = {
  create, getAll, getById, updateProduct, deleteProduct, commonIncludes
}