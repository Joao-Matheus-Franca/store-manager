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
  if (!name) { 
    const error = await productsServices.validateNewProduct();
    return res.status(400).json(error);
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (name.length >= 5) {
    const result = await productsServices.validateNewProduct(name);
    return res.status(201).json(result);
  }
};

const updateProduct = async (req, res) => { 
  const { params: { id } } = req;
  const product = req.body;
  const validate = await productsServices.validateProduct(id);
  const { type } = validate;
  if (type) return res.status(404).json(validate);
  if (!product.name) { 
    return res.status(400).json({ message: '"name" is required' });
  }
  if (product.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (product.name.length >= 5) {
    const result = await productsServices.validateUpdate(product, id);
    return res.status(200).json(result);
  }
}; 

module.exports = {
  listProducts,
  listOneProduct,
  insertNewProduct,
  updateProduct,
};