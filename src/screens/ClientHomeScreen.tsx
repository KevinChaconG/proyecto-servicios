import React from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,SafeAreaView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';

interface Servicio {
  id: string;
  titulo: string;
  emprendedor: string;
  idEmprendedor: string;
  descripcion: string;
  precio: number;
  contactoEmail: string;
  calificacionPromedio: number;
}

const SERVICIOS_MOCK: Servicio[] = [
  {
    id: '1',
    titulo: 'Chamba de Albañil',
    emprendedor: 'Jose Luis Lopez',
    descripcion: 'soy un buen chalan.',
    idEmprendedor: '123',
    precio: 50.0,
    contactoEmail: 'jose.luis@mail.com',
    calificacionPromedio: 4.5,
  },
  {
    id: '2',
    titulo: 'Contador de votos presidenciales',
    emprendedor: 'Alberto Gomez',
    descripcion: 'Puedo contar votos sin hacer fraude.',
    idEmprendedor: '124',
    precio: 250.0,
    contactoEmail: 'alberto.gomez@mail.com',
    calificacionPromedio: 3.8,
  },
  {
    id: '3',
    titulo: 'Cocinero profesional',
    emprendedor: 'Javier Pérez',
    descripcion: 'cocino cualquier tipo de comida.',
    idEmprendedor: '125',
    precio: 100.0,
    contactoEmail: 'javier.perez@mail.com',
    calificacionPromedio: 5.0,
  },
  {
    id: '4',
    titulo: 'Catering para Eventos Pequeños',
    emprendedor: 'Elena Soto',
    descripcion: 'te ayudo con tus eventos.',
    idEmprendedor: '126',
    precio: 300.0,
    contactoEmail: 'elena.soto@mail.com',
    calificacionPromedio: 4.2,
  },
];

type ClientHomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ClientHome'
>;

const ClientHomeScreen: React.FC<ClientHomeScreenProps> = ({ navigation }) => {
  const renderItem = ({ item }: { item: Servicio }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetalleServicio', {
          id: item.id,
          titulo: item.titulo,
          emprendedor: item.emprendedor,
          idEmprendedor: item.idEmprendedor,
          descripcion: item.descripcion,
          precio: item.precio,
          contactoEmail: item.contactoEmail,
          calificacionPromedio: item.calificacionPromedio,
        })
      }
    >
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardEmprendedor}>Por: {item.emprendedor}</Text>
      <Text style={styles.cardDescription}>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileHeader
        title="Servicios Disponibles"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      <FlatList
        data={SERVICIOS_MOCK}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardEmprendedor: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default ClientHomeScreen;
