// models/Shipment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Shipment = sequelize.define('Shipment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  shipping_method: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tracking_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('preparing', 'shipped', 'in_transit', 'delivered', 'returned'),
    allowNull: false,
  },
  shipped_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  delivered_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estimated_delivery: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'shipments',
  timestamps: false,
});

module.exports = Shipment;
