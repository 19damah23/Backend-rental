const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');
const auth = require('../middlewares/auth');

router
  .get('/:id', auth, userController.getUser)
  .patch('/:id', auth, userController.updateUser);

module.exports = router;
