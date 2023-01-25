const connection = require('../db/connection');

const newSale = () => connection.execute('INSERT INTO sales () VALUES ()');

const registrySaleProduct = async (sales) => { 
  const [result] = await newSale();
  sales.map((s) => connection.execute(`
    INSERT INTO sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?)
  `, [result.insertId, s.productId, s.quantity]));
  return result.insertId;
};

module.exports = {
  registrySaleProduct,
};