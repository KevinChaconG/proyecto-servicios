const sequelize = require('../db/Conexion');

const Usuario = require('./Usuario');
const Emprendedor = require('./Emprendedor');
const CategoriaServicio = require('./CategoriaServicio');
const Servicio = require('./Servicio');
const Trabajo = require('./Trabajo');
const Resena = require('./Resena');


//Relaciones entre Tablas

// USUARIO 1 ─ 1 EMPRENDEDOR
Usuario.hasOne(Emprendedor, {
  foreignKey: 'id_usuario'
});
Emprendedor.belongsTo(Usuario, {
  foreignKey: 'id_usuario'
});

// EMPRENDEDOR 1 ─ N SERVICIO
Emprendedor.hasMany(Servicio, {
  foreignKey: 'id_emprendedor'
});
Servicio.belongsTo(Emprendedor, {
  foreignKey: 'id_emprendedor'
});

// CATEGORIA_SERVICIO 1 ─ N SERVICIO
CategoriaServicio.hasMany(Servicio, {
  foreignKey: 'id_categoria'
});
Servicio.belongsTo(CategoriaServicio, {
  foreignKey: 'id_categoria'
});

// SERVICIO 1 ─ N TRABAJO
Servicio.hasMany(Trabajo, {
  foreignKey: 'id_servicio'
});
Trabajo.belongsTo(Servicio, {
  foreignKey: 'id_servicio'
});

// USUARIO (CLIENTE) 1 ─ N TRABAJO
Usuario.hasMany(Trabajo, {
  as: 'TrabajosComoCliente',
  foreignKey: 'id_cliente'
});
Trabajo.belongsTo(Usuario, {
  as: 'Cliente',
  foreignKey: 'id_cliente'
});

// EMPRENDEDOR 1 ─ N TRABAJO
Emprendedor.hasMany(Trabajo, {
  foreignKey: 'id_emprendedor'
});
Trabajo.belongsTo(Emprendedor, {
  foreignKey: 'id_emprendedor'
});

// TRABAJO 1 ─ 1 RESENA
Trabajo.hasOne(Resena, {
  foreignKey: 'id_trabajo'
});
Resena.belongsTo(Trabajo, {
  foreignKey: 'id_trabajo'
});

// USUARIO (CLIENTE) 1 ─ N RESENA
Usuario.hasMany(Resena, {
  as: 'ResenasCliente',
  foreignKey: 'id_cliente'
});
Resena.belongsTo(Usuario, {
  as: 'ClienteResena',
  foreignKey: 'id_cliente'
});

// EMPRENDEDOR 1 ─ N RESENA
Emprendedor.hasMany(Resena, {
  foreignKey: 'id_emprendedor'
});
Resena.belongsTo(Emprendedor, {
  foreignKey: 'id_emprendedor'
});

module.exports = {
  sequelize,
  Usuario,
  Emprendedor,
  CategoriaServicio,
  Servicio,
  Trabajo,
  Resena
};
