const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('./productModel');
const categoryModel = require('./categoryModel')
// const productCategoryModel = connection.define('products_categories', 
//   { 
//     product_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: productModel,
//         key: 'id'
//       },
//       onDelete: 'CASCADE',
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: categoryModel,
//         key: 'id'
//       },
//       onDelete: 'CASCADE',
//     }
//   },
// );

// module.exports = productCategoryModel;

productModel.belongsToMany(categoryModel, { through: 'products_categories' })
categoryModel.belongsToMany(productModel, { through: 'products_categories' });
