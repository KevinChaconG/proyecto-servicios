import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';
import { useAuth } from '../Context/AuthContext';
import {
  ServicioDisponible,
  obtenerServiciosDisponibles,
} from '../api/servicioAPI';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientHome'>;

function distanciaKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const ClientHome: React.FC<Props> = ({ navigation }) => {
  const { usuario } = useAuth();

  const [servicios, setServicios] = useState<ServicioDisponible[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  const [query, setQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  const [tienePermisoUbicacion, setTienePermisoUbicacion] = useState<
    boolean | null
  >(null);
  const [userRegion, setUserRegion] = useState<Region | null>(null);

  useEffect(() => {
    cargarTodo();
  }, []);

  async function cargarTodo() {
    try {
      setCargando(true);
      await Promise.all([cargarServicios(), obtenerUbicacionCliente()]);
    } catch (error) {

    } finally {
      setCargando(false);
    }
  }

  async function cargarServicios() {
    try {
      const data = await obtenerServiciosDisponibles();
      setServicios(data);
    } catch (error: any) {
      console.error('Error al obtener servicios disponibles:', error);
      Alert.alert(
        'Error',
        error?.message || 'No se pudieron obtener los servicios disponibles.'
      );
    }
  }

  async function obtenerUbicacionCliente() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setTienePermisoUbicacion(false);
        return;
      }

      setTienePermisoUbicacion(true);

      const ubicacion = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = ubicacion.coords;

      const initialRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setUserRegion(initialRegion);
    } catch (error) {
      console.error('Error al obtener ubicación del cliente:', error);
      setTienePermisoUbicacion(false);
    }
  }

  const serviciosFiltrados = useMemo(() => {
    let resultado = servicios;

    if (query.trim() !== '') {
      const q = query.trim().toLowerCase();
      resultado = resultado.filter((s) => {
        const titulo = s.titulo?.toLowerCase() || '';
        const descripcion = s.descripcion?.toLowerCase() || '';
        const nombre = `${s.nombre} ${s.apellido}`.toLowerCase();
        return (
          titulo.includes(q) ||
          descripcion.includes(q) ||
          nombre.includes(q)
        );
      });
    }

    if (selectedDistance !== null && userRegion) {
      resultado = resultado.filter((s) => {
        if (
          s.lat === null ||
          s.lat === undefined ||
          s.lng === null ||
          s.lng === undefined
        ) {
          return false;
        }

        const latServicio = Number(s.lat);
        const lngServicio = Number(s.lng);

        if (isNaN(latServicio) || isNaN(lngServicio)) {
          return false;
        }

        const dist = distanciaKm(
          userRegion.latitude,
          userRegion.longitude,
          latServicio,
          lngServicio
        );

        return dist <= selectedDistance;
      });
    }

    return resultado;
  }, [servicios, query, selectedDistance, userRegion]);

  const irADetalle = (item: ServicioDisponible) => {
    const precioNumero =
      item.precio_base !== null && item.precio_base !== undefined
        ? Number(item.precio_base)
        : undefined;

    const calificacionNumero =
      item.calificacion_promedio !== null &&
      item.calificacion_promedio !== undefined
        ? Number(item.calificacion_promedio)
        : 0;

    navigation.navigate('DetalleServicio', {
      id: item.id_servicio.toString(),
      titulo: item.titulo,
      emprendedor: `${item.nombre} ${item.apellido}`,
      idEmprendedor: item.id_emprendedor.toString(),
      descripcion: item.descripcion,
      precio: precioNumero,
      contactoEmail: item.contacto_email || '',
      calificacionPromedio: calificacionNumero,
    });
  };

  const renderMapa = () => {
    if (tienePermisoUbicacion === false || !userRegion) {
      return (
        <View style={styles.mapaPlaceholder}>
          <Text style={{ textAlign: 'center', color: '#555' }}>
            No se pudo obtener tu ubicación.{'\n'}
            Aún así puedes buscar servicios por nombre.
          </Text>
        </View>
      );
    }

    return (
      <MapView style={styles.mapa} region={userRegion}>
        <Marker
          coordinate={{
            latitude: userRegion.latitude,
            longitude: userRegion.longitude,
          }}
          title="Tu ubicación"
          pinColor="blue"
        />

        {serviciosFiltrados.map((servicio) => {
          if (
            servicio.lat === null ||
            servicio.lat === undefined ||
            servicio.lng === null ||
            servicio.lng === undefined
          ) {
            return null;
          }

          const lat = Number(servicio.lat);
          const lng = Number(servicio.lng);

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={servicio.id_servicio}
              coordinate={{ latitude: lat, longitude: lng }}
              title={servicio.titulo}
              description={`${servicio.nombre} ${servicio.apellido}`}
              onCalloutPress={() => irADetalle(servicio)}
            />
          );
        })}
      </MapView>
    );
  };

  const distanciaOptions = [
    { label: 'Todos', value: null },
    { label: '3 km', value: 3 },
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
  ];

  return (
    <View style={styles.safeArea}>
      <ProfileHeader
        title="Buscar servicios"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por servicio, descripción o emprendedor..."
        />
      </View>

      <View style={styles.filtersContainer}>
        {distanciaOptions.map((opt) => {
          const activo = selectedDistance === opt.value;
          return (
            <TouchableOpacity
              key={opt.label}
              style={[
                styles.filterChip,
                activo && styles.filterChipActive,
              ]}
              onPress={() => setSelectedDistance(opt.value)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activo && styles.filterChipTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          Resultados: {serviciosFiltrados.length}
        </Text>
      </View>

      <View style={styles.myRequestsContainer}>
        <TouchableOpacity
          style={styles.myRequestsButton}
          onPress={() => navigation.navigate('ClientSolicitudes')}
        >
          <Text style={styles.myRequestsTitle}>Mis solicitudes</Text>
          <Text style={styles.myRequestsSubtitle}>
            Revisa el estado de los trabajos que has solicitado.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mapa */}
      <View style={styles.mapaContainer}>
        {cargando && !userRegion ? (
          <View style={styles.mapaPlaceholder}>
            <ActivityIndicator size="large" />
            <Text>Cargando mapa y servicios...</Text>
          </View>
        ) : (
          renderMapa()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },

  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },

  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 12,
    color: '#333',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  infoRow: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
  },

  myRequestsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  myRequestsButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  myRequestsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  myRequestsSubtitle: {
    fontSize: 13,
    color: '#555',
  },

  mapaContainer: {
    flex: 1,
    marginTop: 4,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eaeaea',
  },
  mapa: {
    flex: 1,
  },
  mapaPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClientHome;
