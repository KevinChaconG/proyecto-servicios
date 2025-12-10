import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';
import {
  Servicio,
  obtenerServiciosPorEmprendedor,
  actualizarServicio as apiActualizarServicio,
  eliminarServicio as apiEliminarServicio,
} from '../api/servicioAPI';

type Props = NativeStackScreenProps<RootStackParamList, 'EmprendedorServicios'>;

const EmprendedorServicios: React.FC<Props> = ({ navigation }) => {
  const { usuario } = useAuth();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // estados locales para edición
  const [tituloEdit, setTituloEdit] = useState('');
  const [descripcionEdit, setDescripcionEdit] = useState('');
  const [precioEdit, setPrecioEdit] = useState('');
  const [direccionEdit, setDireccionEdit] = useState('');

  useEffect(() => {
    if (!usuario?.id_emprendedor) return;
    cargarServicios();
  }, [usuario?.id_emprendedor]);

  async function cargarServicios() {
    try {
      setCargando(true);
      const data = await obtenerServiciosPorEmprendedor(
        usuario!.id_emprendedor!
      );
      setServicios(data);
    } catch (error: any) {
      console.error('Error al cargar servicios:', error);
      Alert.alert(
        'Error',
        error?.message || 'No se pudieron obtener los servicios.'
      );
    } finally {
      setCargando(false);
    }
  }

  function iniciarEdicion(servicio: Servicio) {
    setEditandoId(servicio.id_servicio);
    setTituloEdit(servicio.titulo);
    setDescripcionEdit(servicio.descripcion);
    setPrecioEdit(
      servicio.precio_base !== null && servicio.precio_base !== undefined
        ? String(servicio.precio_base)
        : ''
    );
    setDireccionEdit(servicio.direccion_referencia || '');
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setTituloEdit('');
    setDescripcionEdit('');
    setPrecioEdit('');
    setDireccionEdit('');
  }

  async function guardarCambios(id_servicio: number) {
    const precioNumber = Number(precioEdit);

    if (!tituloEdit || !descripcionEdit || isNaN(precioNumber) || precioNumber <= 0) {
      Alert.alert('Validación', 'Título, descripción y precio deben ser válidos.');
      return;
    }

    try {
      setCargando(true);

      await apiActualizarServicio(id_servicio, {
        titulo: tituloEdit,
        descripcion: descripcionEdit,
        precio_base: precioNumber,
        direccion_referencia: direccionEdit,
      });

      Alert.alert('Éxito', 'Servicio actualizado correctamente.');
      cancelarEdicion();
      await cargarServicios();
    } catch (error: any) {
      console.error('Error al actualizar servicio:', error);
      Alert.alert(
        'Error',
        error?.message || 'No se pudo actualizar el servicio.'
      );
    } finally {
      setCargando(false);
    }
  }

  async function eliminar(id_servicio: number) {
    Alert.alert(
      'Confirmar',
      '¿Seguro que deseas eliminar este servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setCargando(true);
              await apiEliminarServicio(id_servicio);
              Alert.alert('Éxito', 'Servicio eliminado correctamente.');
              await cargarServicios();
            } catch (error: any) {
              console.error('Error al eliminar servicio:', error);
              Alert.alert(
                'Error',
                error?.message || 'No se pudo eliminar el servicio.'
              );
            } finally {
              setCargando(false);
            }
          },
        },
      ]
    );
  }

  const renderItem = ({ item }: { item: Servicio }) => {
    const enEdicion = editandoId === item.id_servicio;

    // Convertimos precio_base a número si existe
    const precioNumero =
      item.precio_base !== null && item.precio_base !== undefined
        ? Number(item.precio_base)
        : null;

    if (enEdicion) {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Editar servicio</Text>

          <TextInput
            style={styles.input}
            value={tituloEdit}
            onChangeText={setTituloEdit}
            placeholder="Título del servicio"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            value={descripcionEdit}
            onChangeText={setDescripcionEdit}
            placeholder="Descripción"
            multiline
          />

          <TextInput
            style={styles.input}
            value={precioEdit}
            onChangeText={setPrecioEdit}
            keyboardType="numeric"
            placeholder="Precio base"
          />

          <TextInput
            style={styles.input}
            value={direccionEdit}
            onChangeText={setDireccionEdit}
            placeholder="Dirección de referencia"
          />

          <View style={styles.rowButtons}>
            <View style={styles.rowButton}>
              <Button
                title="Guardar"
                onPress={() => guardarCambios(item.id_servicio)}
              />
            </View>
            <View style={styles.rowButton}>
              <Button title="Cancelar" color="#888" onPress={cancelarEdicion} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>

        {precioNumero !== null && !isNaN(precioNumero) ? (
          <Text style={styles.cardSubtitle}>
            Precio base: L. {precioNumero.toFixed(2)}
          </Text>
        ) : (
          <Text style={styles.cardSubtitle}>Precio base no definido</Text>
        )}

        <Text style={styles.cardDescription}>{item.descripcion}</Text>

        {item.direccion_referencia ? (
          <Text style={styles.cardExtra}>Zona: {item.direccion_referencia}</Text>
        ) : null}

        <View style={styles.rowButtons}>
          <View style={styles.rowButton}>
            <Button title="Editar" onPress={() => iniciarEdicion(item)} />
          </View>
          <View style={styles.rowButton}>
            <Button
              title="Eliminar"
              color="#d9534f"
              onPress={() => eliminar(item.id_servicio)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Mis Servicios"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      {cargando && servicios.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Cargando servicios...</Text>
        </View>
      ) : (
        <FlatList
          data={servicios}
          keyExtractor={(item) => item.id_servicio.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>No tienes servicios publicados aún.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  listContainer: {
    padding: 16,
  },
  center: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  cardExtra: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  rowButton: {
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
});

export default EmprendedorServicios;
