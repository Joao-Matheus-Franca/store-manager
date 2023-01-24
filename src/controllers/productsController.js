const express = require('express');

const productsServices = require('../services/productsServices');

const router = express.Router();

router.get('/', productsServices.validateAllProducts);
router.get('/:id', productsServices.validateProduct);

module.exports = router;