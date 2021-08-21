const conn = require('../configs/db')

// Created data to vehicles table
const createCategory = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO categories SET ?', data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

module.exports = {
  createCategory
}