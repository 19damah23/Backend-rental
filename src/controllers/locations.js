const locationModels = require("../models/locations");
const { v4: uuid } = require("uuid");

const createLocation = async (req, res, next) => {
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

const getLocations = async (req, res, next) => {
  try {
    const data = await locationModels.getLocations()

    if (data.length > 0) {
      res.status(200);
      res.json({
        data
      });
    } else {
      res.status(404).send({
        message: 'Data not found!'
      });
    }
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports ={
  createLocation,
  getLocations
}