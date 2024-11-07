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
    },
    marca: {
      type: DataTypes.STRING,
    },
    modelo: {
      type: DataTypes.STRING,
    },
    referencia: {
      type: DataTypes.STRING,
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
      type: DataTypes.JSONB, // Usamos JSONB para armazenar um array de valores
      allowNull: false, 
    },
    tamanhos: {
      type: DataTypes.JSONB,  
      allowNull: false, 
    },
    backgrounds: {
      type: DataTypes.JSONB,  
      allowNull: false,  
    },
  },
);

module.exports  = productModel

// // Exemplo de uso: Sincronizar a tabela com o banco de dados
// sequelize.sync()
//   .then(() => {
//     console.log('Tabela "produtos" criada com sucesso!');
//   })
//   .catch(err => {
//     console.error('Erro ao criar tabela: ', err);
//   });

