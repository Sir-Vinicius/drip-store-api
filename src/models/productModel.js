const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');

const productModel = connection.define('products',
  {
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true, 
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Armazena o slug do produto
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Define se o produto pode ser exibida no menu
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    // Quantidade de produto disponível
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
);

module.exports  = productModel
