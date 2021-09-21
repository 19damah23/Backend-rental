const conn = require('../configs/db');

const createLocation = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO locations SET ?', data, (error, result) => {
    if (!error) {
      resolve(result);
    } else {
      reject(error);
    }
  });
});

const getLocations = () => new Promise((resolve, reject) => {
  conn.query('SELECT * FROM locations', (error, result) => {
    if (!error) {
      resolve(result);
    } else {
      reject(error);
    }
  });
});

module.exports = {
  createLocation,
  getLocations,
};
