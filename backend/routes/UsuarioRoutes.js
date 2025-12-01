const express = require('express');
const router = express.Router();
const { obtenerUsuarios, registrarUsuario, loginUsuario } = require('../controllers/UsuarioController');

router.get('/', obtenerUsuarios);
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;
