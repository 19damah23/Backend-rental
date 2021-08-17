const conn = require('../configs/db')

// Register user
const register = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO users SET ?', data, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  });
});

// find user by email
const findUser = (email) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM users WHERE email = '${email}'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

module.exports = {
  register,
  findUser
}