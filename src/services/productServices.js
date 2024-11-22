const { Op } = require('sequelize');
const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const categoryModel = require('../models/categoryModel');

const commonIncludes = [
  {
    model: productImageModel,
    as: 'images',
    attributes: ['path', 'id'],
    required: true
  },
  {
    model: categoryModel,
    as: 'categories',
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    through: {
      attributes: []
    }
  }
];

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
      include: commonIncludes,
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
      include: commonIncludes
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

const createProductLogic = async (productData, imagesUrl, categoryIds) => {
  
  const product = await productModel.create(productData)

  if (Array.isArray(imagesUrl) && imagesUrl.length > 0) {
    const images = imagesUrl.map((path) => ({
      path,
      productId: product.id,
    }));
    await productImageModel.bulkCreate(images);
  } else {
    const defaultImage = {
      productId: product.id,
    };
    await productImageModel.create(defaultImage);
  }

  if (Array.isArray(categoryIds) && categoryIds.length > 0) {
    const categories = await categoryModel.findAll({
      where: { id: categoryIds },
    });
    await product.addCategories(categories); 
  }

  return await productModel.findByPk(product.id, {
    include: [{
      model: productImageModel,
      as: 'images',
      attributes: ['path', 'id'],
      required: false
    },
    {
      model: categoryModel,
      as: 'categories',
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    }
  ]
  });
}

module.exports = { searchProductsLogic, updateProductLogic, commonIncludes, createProductLogic };
