const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth')

router
  .post('/register', authControllers.register)
  .post('/login', authControllers.login)
  .post('/activation/:token', authControllers.userActivation)

module.exports = router