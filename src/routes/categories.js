const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categories');
const auth = require('../middlewares/auth');

router
  .post('/', auth, categoryController.createCategory)
  .get('/', categoryController.getCategories)
  .get('/:id', categoryController.getCategory);

module.exports = router;
