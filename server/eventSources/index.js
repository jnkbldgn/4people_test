const express = require('express');
const products = require('./products');

const router = express.Router();

router.use(products.getProducts);

module.exports = router;
