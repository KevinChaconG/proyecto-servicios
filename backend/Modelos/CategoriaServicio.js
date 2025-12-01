const { DataTypes } = require('sequelize');
const sequelize = require('../db/Conexion');

const CategoriaServicio = sequelize.define('CategoriaServicio', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  servicio: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'categoria_servicio',
  timestamps: false
});

module.exports = CategoriaServicio;
