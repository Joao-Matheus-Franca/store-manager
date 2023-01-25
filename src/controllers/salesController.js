const salesServices = require('../services/salesServices');

const sendNewSale = async (req, res) => { 
  const validate = await salesServices.validateSales(req.body);
  if (validate.type === 1) return res.status(400).json({ message: validate.message });
  if (validate.type === 2) return res.status(400).json({ message: validate.message });
  if (validate.type === 3) return res.status(422).json({ message: validate.message });
  if (validate.type === 4) return res.status(404).json({ message: validate.message });
  return res.status(201).json(validate);
}; 

module.exports = {
  sendNewSale,
};