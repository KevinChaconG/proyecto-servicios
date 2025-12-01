const { DataTypes } = require('sequelize');
const sequelize = require('../db/Conexion');

const Servicio = sequelize.define('Servicio', {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_emprendedor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  calificacion_promedio: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 0.0
  }
}, {
  tableName: 'servicio',
  timestamps: false
});

module.exports = Servicio;
