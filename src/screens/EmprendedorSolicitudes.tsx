import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';
import {
  obtenerSolicitudesPorEmprendedor,
  SolicitudTrabajo,
  actualizarEstadoTrabajo,
} from '../api/TrabajoApi';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'EmprendedorSolicitudes'
>;

const EmprendedorSolicitudes: React.FC<Props> = ({ navigation }) => {
  const { usuario } = useAuth();

  const [solicitudes, setSolicitudes] = useState<SolicitudTrabajo[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  async function cargarSolicitudes() {
    try {
      if (!usuario?.id_emprendedor) {
        console.warn('Usuario sin id_emprendedor');
        setSolicitudes([]);
        return;
      }

      const data = await obtenerSolicitudesPorEmprendedor(
        usuario.id_emprendedor
      );
      setSolicitudes(data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
      Alert.alert(
        'Error',
        'Ocurrió un problema al obtener las solicitudes recibidas.'
      );
    } finally {
      setCargando(false);
    }
  }

  async function cambiarEstado(
    id_trabajo: number,
    nuevoEstado: 'EN_PROCESO' | 'CANCELADO' | 'COMPLETADO'
  ) {
    try {
      await actualizarEstadoTrabajo(id_trabajo, nuevoEstado);
      await cargarSolicitudes();
    } catch (error: any) {
      console.error('Error al cambiar estado:', error);
      Alert.alert(
        'Error',
        error?.message || 'No se pudo actualizar el estado del trabajo.'
      );
    }
  }

  const renderItem = ({ item }: { item: SolicitudTrabajo }) => (
    <View style={styles.card}>
      <Text style={styles.servicio}>{item.servicio_titulo}</Text>
      <Text style={styles.cliente}>
        Cliente: {item.cliente_nombre} {item.cliente_apellido}
      </Text>
      {item.cliente_telefono && (
        <Text style={styles.info}>Teléfono: {item.cliente_telefono}</Text>
      )}
      <Text style={styles.info}>
        Dirección: {item.direccion_trabajo || '(Sin dirección)'}
      </Text>
      <Text style={styles.info}>
        Mensaje: {item.mensaje_cliente || '(Sin mensaje)'}
      </Text>
      <Text style={styles.estado}>Estado: {item.estado}</Text>

      {item.estado === 'PENDIENTE' && (
        <View style={styles.rowButtons}>
          <View style={styles.rowButton}>
            <Button
              title="Aceptar"
              onPress={() => cambiarEstado(item.id_trabajo, 'EN_PROCESO')}
            />
          </View>
          <View style={styles.rowButton}>
            <Button
              title="Rechazar"
              color="#d9534f"
              onPress={() => cambiarEstado(item.id_trabajo, 'CANCELADO')}
            />
          </View>
        </View>
      )}

      {item.estado === 'EN_PROCESO' && (
        <View style={styles.rowButtons}>
          <View style={styles.rowButton}>
            <Button
              title="Marcar como completado"
              onPress={() => cambiarEstado(item.id_trabajo, 'COMPLETADO')}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Solicitudes Recibidas"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      {cargando ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Cargando solicitudes...</Text>
        </View>
      ) : solicitudes.length === 0 ? (
        <View style={styles.center}>
          <Text>No hay solicitudes por el momento.</Text>
        </View>
      ) : (
        <FlatList
          data={solicitudes}
          keyExtractor={(item) => item.id_trabajo.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  listContainer: { padding: 16 },
  center: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  servicio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  cliente: { fontSize: 16, marginBottom: 4, color: '#333' },
  info: { fontSize: 14, color: '#555' },
  estado: { marginTop: 6, fontWeight: 'bold', color: '#007AFF' },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  rowButton: {
    marginLeft: 8,
  },
});

export default EmprendedorSolicitudes;
