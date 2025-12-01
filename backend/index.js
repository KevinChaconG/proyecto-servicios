const express = require('express');
const cors = require('cors');

const { sequelize } = require('./Modelos');
const usuarioRoutes = require('./routes/UsuarioRoutes');
const servicioRoutes = require('./routes/ServicioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    
    app.listen(5050, () => {
      console.log('Aplicación ejecutándose correctamente en el puerto 5050');
    });
  })
  .catch(error => {
    console.log('Error al conectar a la base de datos:', error);
  });
