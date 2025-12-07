
--SQL Scripts---

create database servicios_app

use servicios_app

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(30),
  password VARCHAR(255) NOT NULL,
  rol_usuario ENUM('EMPRENDEDOR','CLIENTE','ADMIN') NOT NULL,
  estado_usuario ENUM('ACTIVO','SUSPENDIDO','ELIMINADO') NOT NULL DEFAULT 'ACTIVO',
  calificacion_promedio DECIMAL(2,1) NOT NULL DEFAULT 0.0
)

select * from usuario

CREATE TABLE emprendedor (
  id_emprendedor INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL UNIQUE,
  disponible TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_emprendedor_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE categoria_servicio (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  servicio VARCHAR(100) NOT NULL,
  descripcion TEXT
)

CREATE TABLE servicio (
  id_servicio INT AUTO_INCREMENT PRIMARY KEY,
  id_emprendedor INT NOT NULL,
  id_categoria INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  calificacion_promedio DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  CONSTRAINT fk_servicio_emprendedor
    FOREIGN KEY (id_emprendedor) REFERENCES emprendedor(id_emprendedor)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_servicio_categoria
    FOREIGN KEY (id_categoria) REFERENCES categoria_servicio(id_categoria)
    ON UPDATE CASCADE ON DELETE RESTRICT
) 

CREATE TABLE trabajo (
  id_trabajo INT AUTO_INCREMENT PRIMARY KEY,
  id_servicio INT NOT NULL,
  id_cliente INT NOT NULL,
  id_emprendedor INT NOT NULL,
  fecha_solicitud DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  direccion_trabajo VARCHAR(255),
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),  -- renombrado para evitar conflicto con LONG
  precio_acordado DECIMAL(10,2),
  estado ENUM('PENDIENTE','EN_PROCESO','COMPLETADO','CANCELADO')
         NOT NULL DEFAULT 'PENDIENTE',
  CONSTRAINT fk_trabajo_servicio
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_trabajo_cliente
    FOREIGN KEY (id_cliente) REFERENCES usuario(id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_trabajo_emprendedor
    FOREIGN KEY (id_emprendedor) REFERENCES emprendedor(id_emprendedor)
    ON UPDATE CASCADE ON DELETE RESTRICT
)

CREATE TABLE resena (
  id_resena INT AUTO_INCREMENT PRIMARY KEY,
  id_trabajo INT NOT NULL,
  id_cliente INT NOT NULL,
  id_emprendedor INT NOT NULL,
  calificacion TINYINT NOT NULL,
  comentario TEXT,
  fecha_resena DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_resena_trabajo
    FOREIGN KEY (id_trabajo) REFERENCES trabajo(id_trabajo)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_resena_cliente
    FOREIGN KEY (id_cliente) REFERENCES usuario(id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_resena_emprendedor
    FOREIGN KEY (id_emprendedor) REFERENCES emprendedor(id_emprendedor)
    ON UPDATE CASCADE ON DELETE RESTRICT
) 

ALTER TABLE resena
  ADD CONSTRAINT uq_resena_trabajo UNIQUE (id_trabajo);
  ALTER TABLE trabajo ADD COLUMN descripcion TEXT;




este lo uso por si no me da la verificacion de la contraseña, no tocar
 async function manejarLogin(): Promise<void> {
  try {
    setCargando(true);
    // const respuesta = await login(email, password);

    Alert.alert('Éxito', 'Login simulado exitoso.');

    navigation.replace('ClientHome');

} catch (error: any) {
} finally {
}
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={cargando ? 'Ingresando...' : 'Ingresar'}
        onPress={manejarLogin}
        disabled={cargando}
      />
      
      <View style={styles.linkContainer}>
        <Button
          title="Aún no tengo usuario (Registrarse)"
          onPress={() => navigation.navigate('Register')}
          color="#841584"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
    },
    linkContainer: { 
        marginTop: 20, 
    },
});



esta es la ip de mi pc 
export const BASE_URL = 'http://192.168.1.39:5050';

esta es la de mi compañero
export const BASE_URL = 'http://192.168.6.216:5050';