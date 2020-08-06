const express = require('express');
const products = require('./products');

const router = express.Router();

router.get('/products', products.getProducts);

module.exports = router;
