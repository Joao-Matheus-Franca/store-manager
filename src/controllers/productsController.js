const productsServices = require('../services/productsServices');

const listProducts = async (_req, res) => { 
  const { products } = await productsServices.validateAllProducts();
  res.status(200).json(products);
};

const listOneProduct = async (req, res) => {
  const { params: { id } } = req;
  const result = await productsServices.validateProduct(id);
  const { type } = result;
  if (type) res.status(404).json(result);
  else res.status(200).json(result.product);
};

const insertNewProduct = async (req, res) => {
  const { body: { name } } = req;
  if (name) {
    const result = await productsServices.validateNewProduct(name);
    res.status(201).json(result);
  }
};

module.exports = {
  listProducts,
  listOneProduct,
  insertNewProduct,
};