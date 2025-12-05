import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';

interface Servicio {
    id: string;
    titulo: string;
    emprendedor: string;
    descripcion: string;
}

const SERVICIOS_MOCK: Servicio[] = [
    { id: '1', titulo: 'chamba de albañil', emprendedor: 'jose luis lopez', descripcion: 'necesito chalan para la obra' },
    { id: '2', titulo: 'Contador del CNe', emprendedor: 'Alberto Gomez', descripcion: 'quiero a alguien para contar los votos de las elecciones' },
    { id: '3', titulo: 'Rcocinero en restaurante de mala muerte', emprendedor: 'Javier Pérez', descripcion: 'que sepa cocinar y hacer comida de buena calidad' },
    { id: '4', titulo: 'Catering para Eventos Pequeños', emprendedor: 'Elena Soto', descripcion: 'Menús personalizados y deliciosos.' },
];

type ClientHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'ClientHome'>;

const ClientHomeScreen: React.FC<ClientHomeScreenProps> = ({ navigation }) => {
    
    const renderItem = ({ item }: { item: Servicio }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => console.log('Navegando al detalle del servicio:', item.titulo)} 
        >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardEmprendedor}>Por: {item.emprendedor}</Text>
            <Text style={styles.cardDescription}>{item.descripcion}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Servicios Disponibles</Text>
            </View>
            <FlatList
                data={SERVICIOS_MOCK}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
             <View style={styles.footer}>
                <Text 
                    style={styles.logoutText} 
                    onPress={() => navigation.replace('Home')}
                >
                    Cerrar Sesión
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    header: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    listContent: { padding: 10 },
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
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    cardEmprendedor: { fontSize: 14, color: '#007AFF', marginBottom: 3 },
    cardDescription: { fontSize: 14, color: '#555' },
    footer: { padding: 10, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ddd' },
    logoutText: { color: 'red', fontSize: 16, padding: 5 }
});

export default ClientHomeScreen;