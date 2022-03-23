const express = require('express');
const router = express.Router();
const orderControllers = require('../controller/orderControllers');

router.post('/', orderControllers.sendOrder);
router.post('/pay/:id', orderControllers.updatePaymentStatus);

module.exports = router;