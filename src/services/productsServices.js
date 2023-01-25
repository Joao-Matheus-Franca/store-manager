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

const validateNewProduct = async (person) => {
  try {
    const [result] = await productsModels.newProduct(person);
    return { name: person, id: result.insertId };
  } catch (error) {
    return { message: 'Ocorreu um erro ao cadastrar um produto' };
  }
};

module.exports = {
  validateAllProducts,
  validateProduct,
  validateNewProduct,
};