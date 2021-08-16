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

module.exports = {
  addVehicle
}