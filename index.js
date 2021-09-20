require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./src/routes');

const optionCors = {
  credentials: true,
  origin: ['http://localhost:8080'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(optionCors));
app.use(fileUpload());
app.use('/files', express.static(`${__dirname}/src/assets/images`));
app.use(cookieParser());
app.use('/v1', router);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'url not found',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(req.status || 500).json({
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on ${process.env.PORT}`);
});
