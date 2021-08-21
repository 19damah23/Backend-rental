const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categories');
const auth = require('../middlewares/auth')

router
  .post('/', auth, categoryController.createCategory)

module.exports = router;
