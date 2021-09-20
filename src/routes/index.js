const express = require('express');

const router = express.Router();

// routes
const vehicleRoutes = require('./vehicles');
const authRoutes = require('./auth');
const categoryRoutes = require('./categories');
const locationRoutes = require('./locations');
const transactionRoutes = require('./transactions');
const userRoutes = require('./users');

router
  .use('/vehicles', vehicleRoutes)
  .use('/auth', authRoutes)
  .use('/category', categoryRoutes)
  .use('/locations', locationRoutes)
  .use('/transactions', transactionRoutes)
  .use('/users', userRoutes);

module.exports = router;
