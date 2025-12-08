const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'servicios_app',
    'Kevin',
    'Alejandra2731**',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'

    }
)
/*Kevin nombre de la database Alejandra2731** contraseña de la database*/

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa...'))
    .catch(error => console.log('Ocurrió un error en la conexión...' + error))

module.exports = sequelize;