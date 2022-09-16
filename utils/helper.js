require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = (data) => {
  const secretKey = process.env.JWT_SECRET_KEY || 'rahasia';
  const accessToken = jwt.sign(data, secretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return accessToken;
};

module.exports = {
  generateAccessToken,
};
