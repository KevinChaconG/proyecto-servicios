const { DataTypes } = require('sequelize');
const sequelize = require('../db/Conexion');

const Resena = sequelize.define('Resena', {
  id_resena: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_trabajo: {
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
  calificacion: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_resena: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'resena',
  timestamps: false
});

module.exports = Resena;
