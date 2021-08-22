const conn = require('../configs/db')

const createLocation = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO categories SET ?', data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

module.exports = {
  createLocation
}