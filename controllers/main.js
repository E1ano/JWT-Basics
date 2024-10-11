const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;
  const id = new Date().getDate(); // just demo

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  if (!username || !password) {
    throw new CustomAPIError('Provide email and password!', 400);
  }

  res.status(200).send({ msg: 'User created successfully!', token });
};

const dashborad = (req, res) => {
  const { username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  const secret = `Here's your authorized data, your lucky number is ${luckyNumber}`;
  res.status(200).send({ msg: `Hello, ${username}!`, secret });
};

module.exports = { login, dashborad };
