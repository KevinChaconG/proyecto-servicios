const { Trabajo } = require('../Modelos'); 

async function crearSolicitud(req, res) {
    try {
        const { id_servicio, id_cliente, id_emprendedor, direccion_trabajo, mensaje_cliente } = req.body; 
        
        
        if (!id_servicio || !id_cliente || !id_emprendedor || !direccion_trabajo || !mensaje_cliente) {
             return res.status(400).json({ mensaje: 'Faltan datos obligatorios para la solicitud.' });
        }

        const nuevaSolicitud = await Trabajo.create({
            id_servicio,
            id_cliente,
            id_emprendedor,
            direccion_trabajo,
            descripcion: mensaje_cliente, 
        });

        res.status(201).json({ 
            mensaje: 'Solicitud de trabajo creada con éxito.',
            trabajo: {
                id_trabajo: nuevaSolicitud.id_trabajo,
                estado: nuevaSolicitud.estado
            }
        });

    } catch (error) {
        console.error('Error al crear la solicitud de trabajo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor al procesar la solicitud.' });
    }
}
module.exports = {
    crearSolicitud,
};