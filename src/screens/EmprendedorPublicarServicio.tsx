import React, { useState } from 'react';
import {View,Text,TextInput,Button,StyleSheet,Alert,ScrollView,} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';
// (luego conectarás con tu API real)
import { crearSolicitudTrabajo } from '../api/TrabajoApi';

type Props = NativeStackScreenProps<RootStackParamList, 'EmprendedorPublicarServicio'>;

const EmprendedorPublicarServicio: React.FC<Props> = ({ navigation }) => {
  const { usuario } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [contactoEmail, setContactoEmail] = useState(usuario?.email || '');
  const [cargando, setCargando] = useState(false);

  const handlePublicar = async () => {
    if (!usuario) {
      Alert.alert('Error', 'No hay un emprendedor en sesión.');
      return;
    }

    if (!titulo || !descripcion || !precio) {
      Alert.alert('Error', 'Título, descripción y precio son obligatorios.');
      return;
    }

    const precioNumber = Number(precio);
    if (isNaN(precioNumber) || precioNumber <= 0) {
      Alert.alert('Error', 'El precio debe ser un número mayor a 0.');
      return;
    }

    setCargando(true);

    try {
      // estructura básica recomendada para el backend
      const nuevoServicio = {
        titulo,
        descripcion,
        precio: precioNumber,
        contactoEmail,
        idEmprendedor: usuario.id_usuario,
      };

      // TODO: cambiar por tu endpoint real
      // await publicarServicio(nuevoServicio);

      console.log('Servicio a publicar:', nuevoServicio);
      Alert.alert('Éxito', 'Servicio publicado correctamente.');
      // opcional: limpiar formulario
      setTitulo('');
      setDescripcion('');
      setPrecio('');
      // mantener email
    } catch (error: any) {
      console.error('Error al publicar servicio:', error);
      Alert.alert(
        'Error',
        error.message || 'Ocurrió un problema al publicar el servicio.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Publicar Servicio"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Crea una nueva chamba</Text>
        <Text style={styles.helpText}>
          Describe bien tu servicio para que los clientes te encuentren fácil.
        </Text>

        <Text style={styles.label}>Título del servicio (*)</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: Albañil para remodelaciones"
        />

        <Text style={styles.label}>Descripción (*)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Describe qué ofreces, experiencia, horarios, etc."
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Precio aproximado (Lps) (*)</Text>
        <TextInput
          style={styles.input}
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
          placeholder="Ej: 500"
        />

        <Text style={styles.label}>Correo de contacto</Text>
        <TextInput
          style={styles.input}
          value={contactoEmail}
          onChangeText={setContactoEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <Button
            title={cargando ? 'Publicando...' : 'Publicar Servicio'}
            onPress={handlePublicar}
            disabled={cargando}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Volver" onPress={() => navigation.goBack()} color="#888" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  helpText: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default EmprendedorPublicarServicio;
