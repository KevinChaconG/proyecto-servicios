import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import { actualizarUsuario } from '../api/usuarioApi';
import { useAuth } from '../Context/AuthContext';

type EditarPerfilProps = NativeStackScreenProps<RootStackParamList, 'EditarPerfil'>;

const EditarPerfilScreen: React.FC<EditarPerfilProps> = ({ navigation }) => {
  const { usuario, setUsuario } = useAuth();

  console.log('Usuario en EditarPerfil:', usuario);

  if (!usuario) {
    return (
      <View style={styles.cargandoContainer}>
        <Text>No se encontró un usuario en sesión.</Text>
        <Button title="Ir al Login" onPress={() => navigation.replace('Login')} />
      </View>
    );
  }

  const [nombre, setNombre] = useState(usuario.nombre || '');
  const [apellido, setApellido] = useState(usuario.apellido || '');
  const [telefono, setTelefono] = useState(usuario.telefono || '');
  const [password, setPassword] = useState('');

  const [cargando, setCargando] = useState(false);

  const handleGuardarCambios = async () => {
    if (!nombre) {
      Alert.alert('Error', 'El nombre es obligatorio.');
      return;
    }

    setCargando(true);

    const datosParaEnviar: any = {
      nombre,
      apellido,
      telefono: telefono || undefined,
    };

    if (password) {
      datosParaEnviar.password = password; 
    }

    try {
      const usuarioActualizado = await actualizarUsuario(
        usuario.id_usuario,
        datosParaEnviar
      );

      Alert.alert('Éxito', '¡Tus datos han sido actualizados!');
      setPassword('');

      setUsuario({
        ...usuario,
        nombre: usuarioActualizado.nombre ?? usuario.nombre,
        apellido: usuarioActualizado.apellido ?? usuario.apellido,
        telefono: usuarioActualizado.telefono ?? usuario.telefono,
      });
    } catch (error: any) {
      console.error('Error al actualizar:', error);
      Alert.alert(
        'Error al Guardar',
        error.message || 'Hubo un error al actualizar el perfil.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <Text style={styles.helpText}>
        Solo edita los campos que desees cambiar.
      </Text>

      <Text style={styles.label}>Nombre (*)</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Apellido"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        placeholder="Teléfono (Ej: 9988-7766)"
      />

      <Text style={styles.label}>
        Nueva Contraseña (Dejar vacío si no quieres cambiar)
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Ingresar solo para cambiar la contraseña"
      />

      <View style={styles.buttonContainer}>
        <Button
          title={cargando ? 'Guardando...' : 'Guardar Cambios'}
          onPress={handleGuardarCambios}
          disabled={cargando}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Volver"
          onPress={() => navigation.goBack()}
          color="#888"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  cargandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  helpText: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default EditarPerfilScreen;
