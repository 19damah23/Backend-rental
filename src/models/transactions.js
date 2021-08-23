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

module.exports = {
  createTransaction
}