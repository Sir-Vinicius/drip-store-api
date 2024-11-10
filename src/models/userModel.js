const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');

const userModel = connection.define('users',
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
);

module.exports = userModel


