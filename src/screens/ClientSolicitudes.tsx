import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';
import {
  obtenerTrabajosPorCliente,
  TrabajoCliente,
} from '../api/TrabajoApi';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ClientSolicitudes'
>;

const ClientSolicitudes: React.FC<Props> = ({ navigation }) => {
  const { usuario } = useAuth();
  const [trabajos, setTrabajos] = useState<TrabajoCliente[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarTrabajos();
  }, []);

  async function cargarTrabajos() {
    try {
      if (!usuario) return;
      const data = await obtenerTrabajosPorCliente(usuario.id_usuario);
      setTrabajos(data);
    } catch (error) {
      console.error('Error al obtener trabajos del cliente:', error);
    } finally {
      setCargando(false);
    }
  }

  const renderItem = ({ item }: { item: TrabajoCliente }) => (
    <View style={styles.card}>
      <Text style={styles.servicio}>{item.servicio_titulo}</Text>
      <Text style={styles.emprendedor}>
        Emprendedor: {item.emprendedor_nombre} {item.emprendedor_apellido}
      </Text>
      <Text style={styles.info}>
        Dirección: {item.direccion_trabajo || '(Sin dirección)'}
      </Text>
      <Text style={styles.info}>
        Tu mensaje: {item.mensaje_cliente || '(Sin mensaje)'}
      </Text>
      <Text style={styles.estado}>Estado: {item.estado}</Text>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Mis solicitudes"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      {cargando ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Cargando solicitudes...</Text>
        </View>
      ) : trabajos.length === 0 ? (
        <View style={styles.center}>
          <Text>No has enviado solicitudes todavía.</Text>
        </View>
      ) : (
        <FlatList
          data={trabajos}
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
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  servicio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emprendedor: {
    fontSize: 16,
    marginBottom: 4,
    color: '#007AFF',
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  estado: {
    marginTop: 6,
    fontWeight: '600',
    color: '#333',
  },
});

export default ClientSolicitudes;
