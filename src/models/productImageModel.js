const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('./userModel');

const productImageModel = connection.define('products_images',
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: productModel,
        key: 'id'
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'
    },
  },
);

productImageModel.belongsTo(productModel, { foreignKey: 'productId' });

module.exports = productImageModel


