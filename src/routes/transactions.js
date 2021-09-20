const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions');
const auth = require('../middlewares/auth')

router
  .post('/', auth, transactionController.createTransaction)
  .get('/:id', auth, transactionController.getTransaction)
  .patch('/:id', auth, transactionController.updateTransaction)
  .get('/history/:userId', auth, transactionController.getTransactionByUser)
  .get('/admin/history', auth, transactionController.getTransactions)

module.exports = router;
