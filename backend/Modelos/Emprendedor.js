const { DataTypes } = require('sequelize');
const sequelize = require('../db/Conexion');

const Emprendedor = sequelize.define('Emprendedor', {
  id_emprendedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'emprendedor',
  timestamps: false
});

module.exports = Emprendedor;
