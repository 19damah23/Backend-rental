const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');

router
  .post('/add', vehiclesController.addVehicle)

module.exports = router;
