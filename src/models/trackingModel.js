const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Tracking = sequelize.define('Tracking', {
  sno: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  // Define other fields based on requirements
});

module.exports = Tracking;
