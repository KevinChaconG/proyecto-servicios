const { Usuario, Emprendedor } = require('../Modelos');
const bcrypt = require('bcrypt');


async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      attributes: [
        'id_usuario',
        'nombre',
        'apellido',
        'email',
        'telefono',
        'rol_usuario',
        'estado_usuario',
        'calificacion_promedio'
      ]
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}


async function registrarUsuario(req, res) {
  try {
    const { nombre, apellido, email, telefono, password, rol_usuario } = req.body;

    if (!nombre || !email || !password || !rol_usuario) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      apellido,
      email,
      telefono,
      password: passwordHash,  
      rol_usuario
    });

    if (rol_usuario === 'EMPRENDEDOR') {
      await Emprendedor.create({
        id_usuario: usuario.id_usuario,
        disponible: true
      });
    }

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        rol_usuario: usuario.rol_usuario
      }
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol_usuario: usuario.rol_usuario
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

module.exports = {
  obtenerUsuarios,
  registrarUsuario,
  loginUsuario
};
