const authModels = require('../models/auth');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Make register user
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name)
      return res.status(400).send({ message: 'name cannot be null' })
    if (!email)
      return res.status(400).send({ message: 'name cannot be null' })
    if (!password)
      return res.status(400).send({ message: 'password cannot be null' })
    if (!role)
      return res.status(400).send({ message: 'role cannot be null' })

    const user = await authModels.findUser(email);
    if (user.length > 0)
      return res.status(400).send({ message: 'email already exists' });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const date = new Date();
        const datetime =
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

        const data = {
          id: uuid().split('-').join(''),
          name,
          email,
          role,
          password: hash,
          createdAt: datetime,
          updatedAt: datetime
        }

        authModels.register(data);
        delete data.password;

        res.status(201);
        res.json({
          message: 'Register success!',
          data
        });
      })
    })
  } catch (error) {
    next(new Error(error.message))
  }
}

// User login
const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = (await authModels.findUser(email))[0];

    if (!user)
      return res.status(404).send({ message: 'email not registered!' });

    if (user.role != role)
      return res.status(400).send({ message: 'please login accourding to your role!' });

    bcrypt.compare(password, user.password, (err, resCompare) => {
      if (resCompare === false)
        return res.status(401).send({ message: `email and password don't match!` });

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        gender: user.gender,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      }

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      user.token = accessToken;
      delete user.password

      res.json({ user });
    })
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports = {
  register,
  login
}