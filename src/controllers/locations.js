const locationModels = require("../models/locations");
const { v4: uuid } = require("uuid");

const createLocation = async () => {
  try {
    const title = req.body.title

    const date = new Date();
    const datetime =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    const data = {
      id: uuid().split('-').join(''),
      title,
      createdAt: datetime,
      updatedAt: datetime
    }

    await locationModels.createLocation(data)

    res.status(201);
    res.json({
      message: 'Successfully created new location',
      data
    });
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports ={
  createLocation
}