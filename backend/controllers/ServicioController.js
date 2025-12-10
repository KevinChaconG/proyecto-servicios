const Servicio = require('../Modelos/Servicio');
const sequelize = require('../db/Conexion');  
const { QueryTypes } = require('sequelize'); 

async function crearServicio(req, res) {
  try {
    const {
      id_emprendedor,
      id_categoria,
      titulo,
      descripcion,
      precio_base,
      contacto_email,
      direccion_referencia,
      lat,
      lng
    } = req.body;

    if (!id_emprendedor || !titulo || !descripcion || !precio_base) {
      return res.status(400).json({
        mensaje: 'id_emprendedor, titulo, descripcion y precio_base son obligatorios.'
      });
    }

    const nuevoServicio = await Servicio.create({
      id_emprendedor,
      id_categoria: id_categoria ?? null,
      titulo,
      descripcion,
      precio_base,
      contacto_email: contacto_email || null,
      direccion_referencia: direccion_referencia || null,
      lat: lat ?? null,
      lng: lng ?? null,
      activo: 1,          
      calificacion_promedio: 0  
    });

    return res.status(201).json({
      mensaje: 'Servicio creado correctamente.',
      servicio: nuevoServicio
    });
  } catch (error) {
  console.error('Error al crear servicio:', error); 

  return res.status(500).json({
    mensaje: error.message || 'Error interno al crear servicio.'
  });
}
}

async function listarServiciosPorEmprendedor(req, res) {
  try {
    const { idEmprendedor } = req.params;

    const servicios = await Servicio.findAll({
      where: {
        id_emprendedor: idEmprendedor,
        activo: 1,
      },
      order: [['id_servicio', 'DESC']],
    });

    return res.json(servicios);
  } catch (error) {
    console.error('Error al listar servicios del emprendedor:', error);
    return res.status(500).json({
      mensaje: 'Error interno al listar servicios del emprendedor.',
    });
  }
}

async function actualizarServicio(req, res) {
  try {
    const { id } = req.params;
    const {
      titulo,
      descripcion,
      precio_base,
      contacto_email,
      direccion_referencia,
      lat,
      lng,
      id_categoria,
      activo,
    } = req.body;

    const servicio = await Servicio.findByPk(id);

    if (!servicio) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado.' });
    }

    await servicio.update({

      ...(titulo !== undefined && { titulo }),
      ...(descripcion !== undefined && { descripcion }),
      ...(precio_base !== undefined && { precio_base }),
      ...(contacto_email !== undefined && { contacto_email }),
      ...(direccion_referencia !== undefined && { direccion_referencia }),
      ...(lat !== undefined && { lat }),
      ...(lng !== undefined && { lng }),
      ...(id_categoria !== undefined && { id_categoria }),
      ...(activo !== undefined && { activo }),
    });

    return res.json({
      mensaje: 'Servicio actualizado correctamente.',
      servicio,
    });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    return res.status(500).json({
      mensaje:
        error.parent?.sqlMessage ||
        error.message ||
        'Error interno al actualizar servicio.',
    });
  }
}

async function eliminarServicio(req, res) {
  try {
    const { id } = req.params;

    const servicio = await Servicio.findByPk(id);

    if (!servicio) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado.' });
    }

    await servicio.update({ activo: 0 });

    return res.json({ mensaje: 'Servicio eliminado (desactivado) correctamente.' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    return res.status(500).json({
      mensaje:
        error.parent?.sqlMessage ||
        error.message ||
        'Error interno al eliminar servicio.',
    });
  }
}

async function listarServiciosDisponibles(req, res) {
  try {
    const servicios = await sequelize.query(
      `
      SELECT 
        s.id_servicio,
        s.titulo,
        s.descripcion,
        s.precio_base,
        s.contacto_email,
        s.direccion_referencia,
        s.lat,
        s.lng,
        s.calificacion_promedio,
        s.id_emprendedor,
        u.nombre,
        u.apellido
      FROM servicio s
      INNER JOIN emprendedor e ON s.id_emprendedor = e.id_emprendedor
      INNER JOIN usuario u ON e.id_usuario = u.id_usuario
      WHERE s.activo = 1
      ORDER BY s.id_servicio DESC;
      `,
      { type: QueryTypes.SELECT }
    );

    return res.json(servicios);
  } catch (error) {
    console.error('Error al listar servicios disponibles:', error);
    return res.status(500).json({
      mensaje:
        error.parent?.sqlMessage ||
        error.message ||
        'Error interno al listar servicios disponibles.',
    });
  }
}

module.exports = {
  crearServicio,
  listarServiciosPorEmprendedor,
  actualizarServicio,
  eliminarServicio,
  listarServiciosDisponibles
};
