const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listOneProduct);
router.post('/', productsController.insertNewProduct);
router.put('/:id', productsController.updateProduct);

module.exports = router;