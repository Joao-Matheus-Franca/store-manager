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

module.exports = {
  listProducts,
  listOneProduct,
};