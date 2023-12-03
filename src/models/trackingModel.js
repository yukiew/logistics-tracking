// trackingModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig');

const Tracking = sequelize.define('Tracking', {
  sno: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  tracking_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimated_delivery: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const Recipient = sequelize.define('Recipient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Shipment = sequelize.define('Shipment', {
  sno: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  current_Location_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipient_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tracking_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimated_delivery: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const ShipmentDetail = sequelize.define('ShipmentDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Shipment.hasMany(ShipmentDetail, { foreignKey: 'shipment_sno' });
Shipment.belongsTo(Recipient, { foreignKey: 'recipient_Id' });
Shipment.belongsTo(Location, { foreignKey: 'current_Location_Id' });
ShipmentDetail.belongsTo(Location, { foreignKey: 'location_id' });

module.exports = {
  Tracking,
  Recipient,
  Location,
  Shipment,
  ShipmentDetail,
};
