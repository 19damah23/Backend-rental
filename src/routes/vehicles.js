const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');
const auth = require('../middlewares/auth')

router
  .post('/add', auth, vehiclesController.addVehicle)
  .get('/', vehiclesController.getAllVehicles)
  .get('/:id', vehiclesController.getVehicle)
  .delete('/:id', auth, vehiclesController.deleteVehicle)
  .patch('/:id', auth, vehiclesController.editVehicle)

module.exports = router;
