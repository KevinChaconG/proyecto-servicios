const { DataTypes } = require('sequelize');
const sequelize = require('../db/Conexion');

const Trabajo = sequelize.define('Trabajo', {
  id_trabajo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_servicio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_emprendedor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  direccion_trabajo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  precio_acordado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO'),
    allowNull: false,
    defaultValue: 'PENDIENTE'
  }
}, {
  tableName: 'trabajo',
  timestamps: false
});

module.exports = Trabajo;
