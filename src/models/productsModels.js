const connection = require('../db/connection');

const findAll = () => connection.execute('SELECT * FROM products');

const findById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const newProduct = (product) => connection.execute(`
  INSERT INTO products (name) VALUES (?) 
`, [product]);

module.exports = {
  findAll,
  findById,
  newProduct,
};