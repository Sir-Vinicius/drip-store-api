const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');

const productModel = connection.define('products',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco_original: {
      type: DataTypes.FLOAT,
      allowNull: false, 
    },
    preco_desconto: {
      type: DataTypes.FLOAT,
      allowNull: false,  
    },
    imagem_url: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    cores: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false, 
    },
    tamanhos: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false, 
    },
    backgrounds: {
      type: DataTypes.ARRAY(DataTypes.STRING),  
      allowNull: false,  
    },
  },
);

module.exports  = productModel


