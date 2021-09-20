const conn = require('../configs/db')

const createTransaction = (data) => new Promise((resolve, reject) => {
  conn.query(`INSERT INTO transactions SET ?`, data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getTransaction = (id) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM transactions WHERE id = '${id}'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const updateTransaction = (id, data) => new Promise((resolve, reject) => {
  conn.query(`UPDATE transactions SET ? WHERE id = '${id}'`, data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getTransactionByUser = (userId, search) => new Promise((resolve, reject) => {
  conn.query(`SELECT transactions.*, vehicles.name as name, vehicles.images as images FROM transactions INNER JOIN vehicles ON transactions.vehiclesId = vehicles.id WHERE transactions.userId = '${userId}' AND vehicles.name LIKE '%${search}%'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getTransactionByUserWithPaginate = (userId, perPage, offset, orderBy, sortBy, search) => new Promise((resolve, reject) => {
  conn.query(`SELECT transactions.*, vehicles.name as name, vehicles.images as images FROM transactions INNER JOIN vehicles ON transactions.vehiclesId = vehicles.id WHERE transactions.userId = '${userId}' AND vehicles.name LIKE '%${search}%' ORDER BY ${orderBy} ${sortBy} LIMIT ${perPage} OFFSET ${offset}`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getTransactions = (search) => new Promise((resolve, reject) => {
  conn.query(`SELECT transactions.*, vehicles.name as name, vehicles.images as images FROM transactions INNER JOIN vehicles ON transactions.vehiclesId = vehicles.id WHERE vehicles.name LIKE '%${search}%'`, (error, result) => {
    if (!error) {
      console.log(result)
      resolve(result)
    } else {
      console.log(error)
      reject(error)
    }
  })
})

const getTransactionsWithPaginate = (perPage, offset, orderBy, sortBy, search) => new Promise((resolve, reject) => {
  conn.query(`SELECT transactions.*, vehicles.name as name, vehicles.images as images FROM transactions INNER JOIN vehicles ON transactions.vehiclesId = vehicles.id WHERE vehicles.name LIKE '%${search}%' ORDER BY ${orderBy} ${sortBy} LIMIT ${perPage} OFFSET ${offset}`, (error, result) => {
    if (!error) {
      console.log(result)
      resolve(result)
    } else {
      console.log(error)
      reject(error)
    }
  })
})

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  getTransactionByUser,
  getTransactionByUserWithPaginate,
  getTransactions,
  getTransactionsWithPaginate
}