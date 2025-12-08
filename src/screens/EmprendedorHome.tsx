import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';

type EmprendedorHomeProps = NativeStackScreenProps<RootStackParamList, 'EmprendedorHome'>;

const EmprendedorHome: React.FC<EmprendedorHomeProps> = ({ navigation }) => {

const navigateTo = (
  screenName: 'EmprendedorPublicarServicio' | 'EmprendedorServicios'
) => {
  navigation.navigate(screenName);
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileHeader
        title="Gestión de Servicios"
        onEditProfile={() => navigation.navigate('EditarPerfil')}
        onLogout={() => navigation.replace('Home')}
      />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateTo('EmprendedorPublicarServicio')}
          
        >
          <Text style={styles.cardTitle}>Publicar un Servicio</Text>
          <Text style={styles.cardSubtitle}>Publica nuevos trabajos o servicios para que los clientes las vean.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateTo('EmprendedorServicios')}
        >
          <Text style={styles.cardTitle}>Servicios Publicados</Text>
          <Text style={styles.cardSubtitle}>Administra tus trabajos o servicios existentes, y ve respuestas de los clientes.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  cardSubtitle: { fontSize: 14, color: '#777' },
});

export default EmprendedorHome;
