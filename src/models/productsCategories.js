const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('./productModel');
const categorieModel = require('./categorieModel')
const productCategoriesModel = connection.define('product_options', 
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

module.exports = productCategoriesModel;
