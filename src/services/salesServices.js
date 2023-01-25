const newSale = require('../models/salesModels');
const productsModels = require('../models/productsModels');

const validateSales = async (sales) => { 
  const validateProductId01 = sales.every((s) => s.productId !== undefined);
  const validateQuantity01 = sales.every((s) => s.quantity !== undefined);
  const validateQuantity02 = sales.every((s) => s.quantity > 0);
  
  const [result] = await productsModels.findAll();
  const data = result.map((r) => r.id);
  const validateProductId02 = sales.every((s) => data.includes(s.productId));

  if (validateProductId01 === false) return { type: 1, message: '"productId" is required' };
  if (validateQuantity01 === false) return { type: 2, message: '"quantity" is required' };
  if (validateQuantity02 === false) {
    return { type: 3, message: '"quantity" must be greater than or equal to 1' };
  }
  if (validateProductId02 === false) return { type: 4, message: 'Product not found' };
  const id = await newSale.registrySaleProduct(sales);
  return {
    id,
    itemsSold: sales,
  };
};

module.exports = {
  validateSales,
};