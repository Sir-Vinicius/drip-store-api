const productModel = require('../models/productModel');
const connection = require('../config/database/connection')
const products = require('./productList');

async function seedProduct() {
  try {
    await connection.sync({ alter: true });
    await productModel.bulkCreate(tenisLista);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.close();
  }
}

console.log(products[2]);