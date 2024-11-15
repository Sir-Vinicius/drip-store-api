const { Op } = require('sequelize');
const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const { required } = require('joi');
const searchProductsLogic = async (params) => {
  try {
    const {
      limit,
      page,
      fields,
      price_range,
    } = params;

    const fieldsArray = fields.split(',');

    const query = {
      attributes: fieldsArray,
      include: [
        {
          model: productImageModel, // Include product images
          as: 'images', // The alias used in the associations
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
    const result = await productModel.findAndCountAll(query);

    return {
      data: result.rows,
      total: result.count,
      limit,
      page
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

module.exports = { searchProductsLogic };
