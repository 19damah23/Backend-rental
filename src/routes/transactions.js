const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions');
const auth = require('../middlewares/auth')

router
  .post('/', auth, transactionController.createTransaction)

module.exports = router;
