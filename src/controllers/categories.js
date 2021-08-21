const categoryModels = require("../models/categories");
const { v4: uuid } = require("uuid");

// Create new category
const createCategory = async (req, res, next) => {
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

    await categoryModels.createCategory(data)

    res.status(201);
     res.json({
       message: 'Successfully created new category',
       data
     });
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports = {
  createCategory
}