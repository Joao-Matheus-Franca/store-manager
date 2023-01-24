const productsModels = require('../models/productsModels');

const validateAllProducts = async (req, res) => {
  const [result] = await productsModels.findAll();
  if (result) res.status(200).json(result);
  else res.status(404).json({ message: 'Products not found' });
};

const validateProduct = async (req, res) => { 
  const { params: { id } } = req;
  const [[result]] = await productsModels.findById(id);
  if (result) res.status(200).json(result);
  else res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  validateAllProducts,
  validateProduct,
};