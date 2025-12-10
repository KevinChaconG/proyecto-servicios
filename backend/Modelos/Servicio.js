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
    allowNull: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio_base: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  contacto_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  direccion_referencia: {
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
  activo: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  calificacion_promedio: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.0
  }
}, {
  tableName: 'servicio',
  timestamps: false
});

module.exports = Servicio;
