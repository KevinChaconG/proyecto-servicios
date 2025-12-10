import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';
import { crearSolicitudTrabajo } from '../api/TrabajoApi';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ContactoEmprendedor'
>;

const ContactoEmprendedor: React.FC<Props> = ({ route, navigation }) => {
  const { usuario } = useAuth();
  const { idServicio, idEmprendedor, nombreEmprendedor } = route.params;

  const [direccionTrabajo, setDireccionTrabajo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  async function manejarEnviarSolicitud() {
    if (!usuario) {
      Alert.alert('Error', 'Debes iniciar sesión para enviar una solicitud.');
      return;
    }

    if (!direccionTrabajo) {
      Alert.alert(
        'Validación',
        'Ingresa la dirección donde necesitas el servicio.'
      );
      return;
    }

    try {
      setCargando(true);

      await crearSolicitudTrabajo({
        id_servicio: Number(idServicio),
        id_cliente: usuario.id_usuario,
        direccion_trabajo: direccionTrabajo,
        mensaje_cliente: mensaje,
      });

      Alert.alert(
        'Solicitud enviada',
        'Tu solicitud ha sido enviada. El emprendedor podrá verla en su panel.'
      );
      navigation.goBack();
    } catch (error: any) {
      console.error('Error al enviar solicitud:', error);
      Alert.alert(
        'Error',
        error?.message || 'Ocurrió un problema al enviar la solicitud.'
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Contactar emprendedor"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Contactar a {nombreEmprendedor}</Text>
        <Text style={styles.helperText}>
          Comparte tu dirección y un mensaje para que el emprendedor sepa
          dónde y qué necesitas.
        </Text>

        <Text style={styles.label}>Dirección del trabajo (*)</Text>
        <TextInput
          style={styles.input}
          value={direccionTrabajo}
          onChangeText={setDireccionTrabajo}
          placeholder="Ej: Col. Ideal, frente a la pulpería La Bendición"
        />

        <Text style={styles.label}>Mensaje para el emprendedor</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Ej: Necesito que llegue mañana por la tarde, traiga sus propias herramientas..."
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={cargando ? 'Enviando...' : 'Enviar solicitud'}
            onPress={manejarEnviarSolicitud}
            disabled={cargando}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancelar"
            color="#888"
            onPress={() => navigation.goBack()}
          />
        </View>

        {cargando && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  helperText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 16,
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
    marginTop: 8,
  },
  loadingOverlay: {
    marginTop: 12,
    alignItems: 'center',
  },
});

export default ContactoEmprendedor;
