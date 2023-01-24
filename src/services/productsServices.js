const productsModels = require('../models/productsModels');

const validateAllProducts = async () => {
  const [result] = await productsModels.findAll();
  if (result) return { products: result };
  return { type: 'error', message: 'Products not found' };
};

const validateProduct = async (id) => { 
  const [[result]] = await productsModels.findById(id);
  if (result) return { product: result };
  return { type: 'error', message: 'Product not found' };
};

module.exports = {
  validateAllProducts,
  validateProduct,
};