const { Op } = require('sequelize');
const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const searchProductsLogic = async (params) => {
  try {
    const {
      limit,
      page,
      fields,
      price_range,
      mark
    } = params;

    const fieldsArray = fields.split(',');

    const query = {
      attributes: fieldsArray,
      include: [
        {
          model: productImageModel, 
          as: 'images',
          attributes: ['path'],
          require: false
        }
      ],
      where: {},
      offset: (page - 1) * limit,
      limit: limit == -1 ? undefined : limit,
      order: []
    };

    if (price_range) {
      const [minPrice, maxPrice] = price_range.split('-').map(Number);
      query.where.price = {
        [Op.between]: [minPrice, maxPrice]
      };
      query.order.push(['price', 'ASC']);
    }

    if (mark) {
      query.where.mark = mark
    }
    
    const result = await productModel.findAndCountAll({
      ...query, 
      distinct: true
    });

    return {
      data: result.rows,
      total: result.count,
      limit,
      page
    };
  } catch (error) {
    console.error('Erro ao buscar produtos', error);
    throw error;
  }
};

const updateImages = async(productId, images) => {
  for (const image of images) {
    if (image.deleted) {
      await productImageModel.destroy({ where: { id: image.id, productId } });
    }
    
    else if (image.id) {
      await productImageModel.update(
        { path: image.path },
        { where: { id: image.id, productId } }
      );
    }

    else {
      await productImageModel.create({
        productId,
        path: image.content,
      });
    }
  }
}

const updateProductLogic = async (productId, productData, images) => {
  try {
    const product = await productModel.findByPk(productId, {
      include: { model: productImageModel, as: 'images' },
    });

    if (!product) {
      throw { status: 404, message: 'Produto não encontrado' };
    }

    if (productData.price < 0) {
      throw { status: 400, message: 'Preço deve ser um valor válido' };
    }

    await product.update(productData);
    
    if (Array.isArray(images)) {
      await updateImages(productId, images);
    }

    return product;

  } catch (error) {
    console.error('Erro ao editar produtos', error);
    throw error
  }
}

module.exports = { searchProductsLogic, updateProductLogic };
