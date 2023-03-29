/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-constant-condition */
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModels = require('../models/auth');
const verification = require('../helpers/common');

// Make register user
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).send({ message: 'name cannot be null' });
    if (!email) return res.status(400).send({ message: 'name cannot be null' });
    if (!password) return res.status(400).send({ message: 'password cannot be null' });

    const user = await authModels.findUser(email);
    if (user.length > 0) return res.status(400).send({ message: 'email already exists' });

    bcrypt.genSalt(10, (err, salt) => {
      // eslint-disable-next-line no-shadow
      bcrypt.hash(password, salt, (err, hash) => {
        const date = new Date();
        const datetime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        const data = {
          id: uuid().split('-').join(''),
          name,
          email,
          role: 'member',
          password: hash,
          createdAt: datetime,
          updatedAt: datetime,
        };

        authModels.register(data);
        delete data.password;

        const payload = {
          name,
          email,
        };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        verification.sendEmail(email, name, token);

        res.status(201);
        res.json({
          message: 'Register success!',
          data,
        });
      });
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const userActivation = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) return res.status(401).send({ message: 'server need token' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name = 'TokenExpiredError') return res.status(403).send({ message: 'Token expired!' });
        if (err.name = 'JsonWebTokenError') return res.status(403).send({ message: err.message });
        if (err.name = 'NotBeforeError') return res.status(403).send({ message: 'jwt not active!' });
      }

      const { email } = decoded;
      const status = 'actived';

      authModels.userActivation(email, status);
      res.status(200);
      res.json({
        message: 'Successfully activation user!',
      });
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

// User login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = (await authModels.findUser(email))[0];

    if (!user) return res.status(404).send({ message: 'email not registered!' });

    bcrypt.compare(password, user.password, (err, resCompare) => {
      if (resCompare === false) return res.status(401).send({ message: 'email and password don\'t match!' });

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        gender: user.gender,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
      };

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      res.cookie('token', token, {
        maxAge: 7200000,
        secure: true,
        path: '/',
        sameSite: 'none',
      });
      res.cookie('userId', user.id, {
        maxAge: 7200000,
        secure: true,
        path: '/',
        SameSite: 'none',
      });
      res.cookie('role', user.role, {
        maxAge: 7200000,
        secure: false,
        path: '/',
        sameSite: 'none',
      });
      res.cookie('isAuth', true, {
        maxAge: 7200000,
        secure: false,
        path: '/',
        sameSite: 'none',
      });
      delete user.password;

      res.json({ user });
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.clearCookie('isAuth');
    res.clearCookie('userId');
    res.clearCookie('role');

    res.status(200);
    res.json({
      message: 'Success logout',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    next(new Error(error.message));
  }
};

module.exports = {
  register,
  login,
  logout,
  userActivation,
};
