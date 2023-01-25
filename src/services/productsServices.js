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
    if (!person) { 
      return { message: '"name" is required' };
    }
    const [result] = await productsModels.newProduct(person);
    return { name: person, id: result.insertId };
  } catch (error) {
    return { message: 'Ocorreu um erro ao cadastrar um produto' };
  }
};

const validateUpdate = async (product, id) => { 
  const [result] = await productsModels.updateProduct(product, id); 
  if (result.affectedRows > 0) return { id, name: product.name };
  return { message: 'Product not found' };
};

module.exports = {
  validateAllProducts,
  validateProduct,
  validateNewProduct,
  validateUpdate,
};