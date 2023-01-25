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

const findAll = () => connection.execute(`
SELECT sale_id AS saleId, date, product_id AS productId, quantity 
FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sl
ON sp.sale_id = sl.id`);

const findById = (id) => connection.execute(`
SELECT date, product_id AS productId, quantity 
FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sl
ON sp.sale_id = sl.id
WHERE sale_id = ?`, [id]);

module.exports = {
  registrySaleProduct,
  findAll,
  findById,
};