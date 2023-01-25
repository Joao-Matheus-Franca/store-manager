const connection = require('../db/connection');

const findAll = () => connection.execute('SELECT * FROM products');

const findById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const newProduct = (product) => connection.execute(`
  INSERT INTO products (name) VALUES (?) 
`, [product]);

const updateProduct = (product, id) => connection.execute(
    `UPDATE products
    SET name = ? WHERE id = ?`, [product.name, id],
); 

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
};