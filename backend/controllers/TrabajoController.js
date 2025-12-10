const Trabajo = require('../Modelos/Trabajo');
const Servicio = require('../Modelos/Servicio');
const sequelize = require('../db/Conexion');
const { QueryTypes } = require('sequelize');

async function solicitarTrabajo(req, res) {
  try {
    const {
      id_servicio,
      id_cliente,
      direccion_trabajo,
      mensaje_cliente,
      lat,
      lng,
    } = req.body;

    if (!id_servicio || !id_cliente) {
      return res
        .status(400)
        .json({ mensaje: 'id_servicio e id_cliente son obligatorios.' });
    }

    const servicio = await Servicio.findByPk(id_servicio);

    if (!servicio) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado.' });
    }

    const nuevoTrabajo = await Trabajo.create({
      id_servicio,
      id_cliente,
      id_emprendedor: servicio.id_emprendedor,
      direccion_trabajo: direccion_trabajo || servicio.direccion_referencia || null,
      lat: lat ?? servicio.lat ?? null,
      lng: lng ?? servicio.lng ?? null,
      precio_acordado: null,
      estado: 'PENDIENTE',
      descripcion: mensaje_cliente || null,
    });

    return res.status(201).json({
      mensaje: 'Solicitud de trabajo creada correctamente.',
      trabajo: nuevoTrabajo,
    });
  } catch (error) {
    console.error('Error al crear solicitud de trabajo:', error);
    return res.status(500).json({
      mensaje:
        error.parent?.sqlMessage ||
        error.message ||
        'Error interno al crear la solicitud de trabajo.',
    });
  }
}

async function obtenerSolicitudesPorEmprendedor(req, res) {
  try {
    const { id_emprendedor } = req.params;

    const solicitudes = await sequelize.query(
      `
      SELECT 
        t.id_trabajo,
        t.id_servicio,
        t.id_cliente,
        t.fecha_solicitud,
        t.direccion_trabajo,
        t.descripcion AS mensaje_cliente,
        t.estado,
        u.nombre AS cliente_nombre,
        u.apellido AS cliente_apellido,
        u.telefono AS cliente_telefono,
        s.titulo AS servicio_titulo
      FROM trabajo t
      INNER JOIN usuario u ON t.id_cliente = u.id_usuario
      INNER JOIN servicio s ON t.id_servicio = s.id_servicio
      WHERE t.id_emprendedor = ?
      ORDER BY t.id_trabajo DESC;
      `,
      {
        replacements: [id_emprendedor],
        type: QueryTypes.SELECT,
      }
    );

    return res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    return res.status(500).json({
      mensaje: error.message || 'Error al obtener solicitudes.',
    });
  }
}

async function actualizarEstadoTrabajo(req, res) {
  try {
    const { id_trabajo } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO'];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado inválido.' });
    }

    const trabajo = await Trabajo.findByPk(id_trabajo);

    if (!trabajo) {
      return res.status(404).json({ mensaje: 'Trabajo no encontrado.' });
    }

    await trabajo.update({ estado });

    return res.json({
      mensaje: 'Estado actualizado correctamente.',
      trabajo,
    });
  } catch (error) {
    console.error('Error al actualizar estado de trabajo:', error);
    return res.status(500).json({
      mensaje: error.message || 'Error al actualizar el estado del trabajo.',
    });
  }
}

async function obtenerTrabajosPorCliente(req, res) {
  try {
    const { id_cliente } = req.params;

    const trabajos = await sequelize.query(
      `
      SELECT 
        t.id_trabajo,
        t.id_servicio,
        t.id_emprendedor,
        t.fecha_solicitud,
        t.direccion_trabajo,
        t.descripcion AS mensaje_cliente,
        t.estado,
        s.titulo AS servicio_titulo,
        u.nombre AS emprendedor_nombre,
        u.apellido AS emprendedor_apellido
      FROM trabajo t
      INNER JOIN servicio s ON t.id_servicio = s.id_servicio
      INNER JOIN emprendedor e ON t.id_emprendedor = e.id_emprendedor
      INNER JOIN usuario u ON e.id_usuario = u.id_usuario
      WHERE t.id_cliente = ?
      ORDER BY t.id_trabajo DESC;
      `,
      {
        replacements: [id_cliente],
        type: QueryTypes.SELECT,
      }
    );

    return res.json(trabajos);
  } catch (error) {
    console.error('Error al obtener trabajos por cliente:', error);
    return res.status(500).json({
      mensaje: error.message || 'Error al obtener trabajos del cliente.',
    });
  }
}

module.exports = {
  solicitarTrabajo,
  obtenerSolicitudesPorEmprendedor,
  actualizarEstadoTrabajo,
  obtenerTrabajosPorCliente
};
