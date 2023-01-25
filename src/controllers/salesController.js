const salesServices = require('../services/salesServices');

const sendNewSale = async (req, res) => { 
  const validate = await salesServices.validateSales(req.body);
  if (validate.type === 1) return res.status(400).json({ message: validate.message });
  if (validate.type === 2) return res.status(400).json({ message: validate.message });
  if (validate.type === 3) return res.status(422).json({ message: validate.message });
  if (validate.type === 4) return res.status(404).json({ message: validate.message });
  return res.status(201).json(validate);
}; 

const sendAllSales = async (_req, res) => { 
  const allSales = await salesServices.listAllSales();
  return res.status(200).json(allSales);
};

const sendOneSale = async (req, res) => {
  const { params: { id } } = req;
  const oneSale = await salesServices.listOneSale(id);
  if (!oneSale.message) return res.status(200).json(oneSale);
  return res.status(404).json(oneSale);
};

module.exports = {
  sendNewSale,
  sendAllSales,
  sendOneSale,
};