const express = require('express');
const router = express.Router();

// routes
const vehicleRoutes = require('./vehicles')
const authRoutes = require('./auth')
const categoryRoutes = require('./categories')

router
  .use('/vehicles', vehicleRoutes)
  .use('/auth', authRoutes)
  .use('/category', categoryRoutes)
  .use('/locations', categoryRoutes)

module.exports = router