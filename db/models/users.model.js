const Sequelize = require('sequelize');
const connection = require('./sequelize');

class UsersTable extends Sequelize.Model {}

UsersTable.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      isEmail: true,
      unique: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    is_email_verified: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_users',
  }
);

module.exports = UsersTable;
