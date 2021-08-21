const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categories');
const auth = require('../middlewares/auth')

router
  .post('/', auth, categoryController.createCategory)
  .get('/', auth, categoryController.getCategories)
  .get('/:id', auth, categoryController.getCategory)

module.exports = router;
