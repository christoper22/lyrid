const Sequelize = require('sequelize');
const config = require('../../config/config');

require('dotenv').config();

// connect db
const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    port: parseInt(config.port, 10),
    // ssl: process.env.NODE_ENV === 'production',
  }
);

module.exports = connection;
