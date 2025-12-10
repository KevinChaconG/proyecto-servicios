const express = require('express');
const {
  solicitarTrabajo,
  obtenerSolicitudesPorEmprendedor,
  actualizarEstadoTrabajo,
  obtenerTrabajosPorCliente
} = require('../controllers/TrabajoController')

const router = express.Router();

router.post('/solicitar', solicitarTrabajo);
router.get('/emprendedor/:id_emprendedor', obtenerSolicitudesPorEmprendedor);
router.put('/:id_trabajo/estado', actualizarEstadoTrabajo);
router.get('/cliente/:id_cliente', obtenerTrabajosPorCliente);


module.exports = router;
