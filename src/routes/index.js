const express = require('express');
const router = express.Router();

// routes
const vehicleRoutes = require('./vehicles')
const authRoutes = require('./auth')

router
  .use('/vehicles', vehicleRoutes)
  .use('/auth', authRoutes)

module.exports = router