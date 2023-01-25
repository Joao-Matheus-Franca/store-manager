const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.sendAllSales);

router.get('/:id', salesController.sendOneSale);

router.post('/', salesController.sendNewSale);

module.exports = router;