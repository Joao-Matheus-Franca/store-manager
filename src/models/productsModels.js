const connection = require('../db/connection');

const findAll = () => connection.execute('SELECT * FROM products');

const findById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

module.exports = {
  findAll,
  findById,
};