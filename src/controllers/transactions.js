/* eslint-disable radix */
const { v4: uuid } = require('uuid');
const transactionModels = require('../models/transactions');
const vehicleModels = require('../models/vehicles');
const userModels = require('../models/users');

const createTransaction = async (req, res, next) => {
  try {
    const {
      userId, vehiclesId, qty, days, date,
    } = req.body;

    const vehicle = await vehicleModels.getVehicle(vehiclesId);

    const subTotal = vehicle[0].price * parseInt(qty) * days;
    const status = 'ordered';

    const expDate = new Date(
      new Date(date).getTime() + parseInt(days) * 24 * 60 * 60 * 1000,
    );

    const data = {
      id: uuid().split('-').join(''),
      userId,
      vehiclesId,
      qty,
      subTotal,
      startDate: date,
      expDate,
      status,
      invoice: Math.random().toString(32).substr(2, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await transactionModels.createTransaction(data);

    res.status(201);
    res.json({
      message: 'Transaction success',
      data,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await transactionModels.getTransaction(id);
    const vehicle = await vehicleModels.getVehicle(data[0].vehiclesId);
    const user = await userModels.getUser(data[0].userId);

    const getStartDate = new Date(data[0].startDate).toISOString().slice(0, 10);
    const getExpDate = new Date(data[0].expDate).toISOString().slice(0, 10);
    data[0].startDate = getStartDate;
    data[0].expDate = getExpDate;
    data[0].vehicle = vehicle[0].name;
    data[0].location = vehicle[0].location;
    data[0].image = JSON.parse(vehicle[0].images);
    data[0].category = vehicle[0].category;
    data[0].username = user[0].name;
    data[0].email = user[0].email;
    data[0].phone = user[0].phone;

    res.status(200);
    res.json({
      data,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { typePay, status } = req.body;

    const data = {
      typePay,
      status,
    };

    await transactionModels.updateTransaction(id, data);

    res.status(200);
    res.json({
      message: 'Success update',
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const getTransactionByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let {
      search, perPage, orderBy, sortBy, page,
    } = req.query;

    search = search || '';
    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 16;
    orderBy = orderBy || 'createdAt';
    sortBy = sortBy || 'DESC';
    const offset = (page - 1) * perPage;

    const allData = await transactionModels.getTransactionByUser(userId, search);
    const totalData = allData.length;
    const totalPage = Math.ceil(totalData / perPage);

    const data = await transactionModels.getTransactionByUserWithPaginate(
      userId,
      perPage,
      offset,
      orderBy,
      sortBy,
      search,
    );

    const history = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      const vehicle = data[i];
      const parse = JSON.parse(data[i].images);
      const getStartDate = new Date(data[i].startDate)
        .toISOString()
        .slice(0, 10);
      const getExpDate = new Date(data[i].expDate).toISOString().slice(0, 10);
      vehicle.images = parse;
      vehicle.startDate = getStartDate;
      vehicle.expDate = getExpDate;

      history.push(vehicle);
    }

    res.status(200);
    res.json({
      meta: {
        totalData,
        page,
        perPage,
        totalPage,
      },
      data: history,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const getTransactions = async (req, res, next) => {
  try {
    let {
      search, perPage, orderBy, sortBy, page,
    } = req.query;

    search = search || '';
    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 16;
    orderBy = orderBy || 'createdAt';
    sortBy = sortBy || 'DESC';
    const offset = (page - 1) * perPage;

    const allData = await transactionModels.getTransactions(search);
    const totalData = allData.length;
    const totalPage = Math.ceil(totalData / perPage);

    const data = await transactionModels.getTransactionsWithPaginate(
      perPage,
      offset,
      orderBy,
      sortBy,
      search,
    );

    const history = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      const vehicle = data[i];
      const parse = JSON.parse(data[i].images);
      const getStartDate = new Date(data[i].startDate)
        .toISOString()
        .slice(0, 10);
      const getExpDate = new Date(data[i].expDate).toISOString().slice(0, 10);
      vehicle.images = parse;
      vehicle.startDate = getStartDate;
      vehicle.expDate = getExpDate;

      history.push(vehicle);
    }

    res.status(200);
    res.json({
      meta: {
        totalData,
        page,
        perPage,
        totalPage,
      },
      data: history,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
    next(new Error(error.message));
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  getTransactionByUser,
  getTransactions,
};
