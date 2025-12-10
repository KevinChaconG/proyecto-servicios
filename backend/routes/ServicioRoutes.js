const express = require('express');
const { crearServicio, listarServiciosPorEmprendedor, actualizarServicio, eliminarServicio, listarServiciosDisponibles } = require('../controllers/ServicioController');

const router = express.Router();

router.post('/', crearServicio); 
router.get('/emprendedor/:idEmprendedor', listarServiciosPorEmprendedor);
router.get('/disponibles', listarServiciosDisponibles);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

module.exports = router;
