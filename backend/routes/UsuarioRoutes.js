const express = require('express');
const router = express.Router();
const { obtenerUsuarios, registrarUsuario, loginUsuario, actualizarUsuario } = require('../controllers/UsuarioController');

router.get('/', obtenerUsuarios);
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/:id', actualizarUsuario);

module.exports = router;
