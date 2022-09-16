const Sequelize = require('sequelize');
const connection = require('./sequelize');

class ItemsTable extends Sequelize.Model {}

ItemsTable.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    codes: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    total_items: {
      type: Sequelize.DataTypes.INTEGER,
    },
    image_product: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_items',
  }
);

module.exports = ItemsTable;
