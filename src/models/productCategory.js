const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('./productModel');
const categoryModel = require('./categoryModel')
const productCategoryModel = connection.define('products_categories', 
  { 
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: productModel,
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: categoryModel,
        key: 'id'
      }
    }
  },
);

module.exports = productCategoryModel;
