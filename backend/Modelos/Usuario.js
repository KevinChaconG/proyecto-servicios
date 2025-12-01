const { DataTypes } = require('sequelize');
const sequelize = require('../db/Conexion');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol_usuario: {
    type: DataTypes.ENUM('EMPRENDEDOR', 'CLIENTE', 'ADMIN'),
    allowNull: false
  },
  estado_usuario: {
    type: DataTypes.ENUM('ACTIVO', 'SUSPENDIDO', 'ELIMINADO'),
    allowNull: false,
    defaultValue: 'ACTIVO'
  },
  calificacion_promedio: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 0.0
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
