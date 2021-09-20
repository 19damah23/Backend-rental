const express = require('express');

const router = express.Router();

const authControllers = require('../controllers/auth');

router
  .get('/logout', authControllers.logout)
  .post('/register', authControllers.register)
  .post('/login', authControllers.login)
  .post('/activation/:token', authControllers.userActivation);

module.exports = router;
