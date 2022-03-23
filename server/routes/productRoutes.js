const express = require('express');
const router = express.Router();
const productControllers = require('../controller/productControllers');

router.get('/all', productControllers.getAllProducts);
router.get('/all/:cat', productControllers.getCategory);
router.get('/:id', productControllers.getProduct);

module.exports = router;