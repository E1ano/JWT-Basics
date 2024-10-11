const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('Unauthorized: No token provided!', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomAPIError('Unauthorized: No token provided!', 401);
  }
};

module.exports = { authenticationMiddleware };
