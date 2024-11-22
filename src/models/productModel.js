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
    },
    mark: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    backgrounds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
  },
);

productModel.hasMany(require('./productImageModel'), {
  foreignKey: 'productId',
  as: 'images',  
});

const categoryModel = require('./categoryModel')

productModel.belongsToMany(categoryModel, { through: 'products_categories' })
categoryModel.belongsToMany(productModel, { through: 'products_categories' });


module.exports  = productModel
