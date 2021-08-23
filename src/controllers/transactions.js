const transactionModels = require("../models/transactions");
const { v4: uuid } = require("uuid");
const vehicleModels = require("../models/vehicles");

const createTransaction = async (req, res, next) => {
  try {
    const { userId, vehiclesId, qty, days, date } = req.body;

    const vehicle = await vehicleModels.getVehicle(vehiclesId)

    const subTotal = vehicle[0].price * parseInt(qty)
    const status = 'ordered'

    var expDate = new Date(new Date(date).getTime()+(parseInt(days)*24*60*60*1000));
    
    const data = {
      id: uuid().split('-').join(''),
      userId,
      vehiclesId,
      qty,
      subTotal,
      startDate: date,
      expDate,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await transactionModels.createTransaction(data)

    res.status(201);
     res.json({
       message: 'Transaction success',
       data
     });
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports = {
  createTransaction
}