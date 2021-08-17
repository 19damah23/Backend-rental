const conn = require('../configs/db')

// Created data to vehicles table
const addVehicle = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO vehicles SET ?', data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

// Get all data from vehicles table
const getAllVehicles = (search) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM vehicles WHERE vehicles.name LIKE '%${search}%'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

// Make pagination
const getVehiclesWithPaginate = (perPage, offset, orderBy, sortBy, search) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM vehicles WHERE vehicles.name LIKE '%${search}%' ORDER BY ${orderBy} ${sortBy} LIMIT ${perPage} OFFSET ${offset}`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

// Get vehicle by id
const getVehicle = (id) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM vehicles WHERE id = '${id}'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

// Delete vehicle
const deleteVehicle = (id) => new Promise((resolve, reject) => {
  conn.query(`DELETE FROM vehicles WHERE id = '${id}'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

// Edit vehicle
const editVehicle = (data, id) => new Promise((resolve, reject) => {
  conn.query(`UPDATE vehicles SET ? WHERE id = '${id}'`, data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

module.exports = {
  addVehicle,
  getAllVehicles,
  getVehiclesWithPaginate,
  getVehicle,
  deleteVehicle,
  editVehicle
}