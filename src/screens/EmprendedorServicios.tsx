import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'EmprendedorServicios'>;

interface ServicioEmprendedor {
  id: string;
  titulo: string;
  estado: 'ACTIVO' | 'PAUSADO';
  numRespuestas: number;
}

const SERVICIOS_MOCK: ServicioEmprendedor[] = [
  { id: '1', titulo: 'Albañil para remodelaciones', estado: 'ACTIVO', numRespuestas: 3 },
  { id: '2', titulo: 'Cocinero para eventos pequeños', estado: 'PAUSADO', numRespuestas: 1 },
];

const EmprendedorServicios: React.FC<Props> = ({ navigation }) => {
  const { usuario } = useAuth();

  const handleEditar = (id: string) => {
    Alert.alert('Editar', `Aquí iría la pantalla para editar el servicio ${id}.`);
    // En el futuro: navigation.navigate('EmprendedorEditarServicio', { idServicio: id });
  };

  const handleVerRespuestas = (id: string) => {
    Alert.alert('Respuestas', `Aquí se mostrarían las respuestas del servicio ${id}.`);
    // En el futuro: navigation.navigate('EmprendedorRespuestasServicio', { idServicio: id });
  };

  const renderItem = ({ item }: { item: ServicioEmprendedor }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardSubtitle}>
        Estado: <Text style={item.estado === 'ACTIVO' ? styles.activo : styles.pausado}>
          {item.estado}
        </Text>
      </Text>
      <Text style={styles.cardSubtitle}>
        Respuestas recibidas: {item.numRespuestas}
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditar(item.id)}
        >
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.responsesButton]}
          onPress={() => handleVerRespuestas(item.id)}
        >
          <Text style={styles.actionText}>Ver respuestas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Mis servicios"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      <View style={styles.container}>
        <Text style={styles.infoText}>
          {usuario
            ? `Servicios publicados por: ${usuario.nombre} ${usuario.apellido ?? ''}`
            : 'Servicios publicados'}
        </Text>

        <FlatList
          data={SERVICIOS_MOCK}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { flex: 1, padding: 20 },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
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
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#333' },
  cardSubtitle: { fontSize: 13, color: '#666', marginBottom: 3 },
  activo: { color: '#2E7D32', fontWeight: 'bold' },
  pausado: { color: '#F57C00', fontWeight: 'bold' },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  responsesButton: {
    backgroundColor: '#2196F3',
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default EmprendedorServicios;
