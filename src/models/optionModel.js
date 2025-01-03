const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('./productModel');

const optionModel = connection.define('options', 
  { 
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: productModel,
        key: 'id'
      }
    },

    // Título da opção (obrigatório)
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Formato da opção (pode ser "square" ou "circle")
    shape: {
      type: DataTypes.ENUM('square', 'circle'),
      allowNull: true,
      defaultValue: 'square',
    },

    // Valor do border-radius (opcional, padrão 0)
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    // Tipo do input (pode ser "text" ou "color")
    type: {
      type: DataTypes.ENUM('text', 'color'),
      allowNull: true,
      defaultValue: 'text',
    },

    // Opções do produto (obrigatório, armazenado como string separada por vírgulas)
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

module.exports = optionModel;
