const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');

const categoryModel = connection.define('categories',
  {
    //Coluna do tipo STRING e de preenchimento obrigatório que armazena o nome da categoria
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    // Coluna do tipo STRING, e de preenchimento obrigatório que armazena o slug da categoria.
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Coluna do tipo BOOLEAN e de preenchimento opcional que define se a categoria pode ser exibida no menu. Valor padrão deve ser 0.
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  },
);

module.exports = categoryModel


