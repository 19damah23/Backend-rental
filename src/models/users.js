const conn = require('../configs/db');

const getUser = (id) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
    if (!error) {
      resolve(result);
    } else {
      reject(error);
    }
  });
});

const updateUser = (id, data) => new Promise((resolve, reject) => {
  conn.query(`UPDATE users SET ? WHERE id = '${id}'`, data, (error, result) => {
    if (!error) {
      resolve(result);
    } else {
      reject(error);
    }
  });
});

module.exports = {
  getUser,
  updateUser,
};
