const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listOneProduct);

module.exports = router;