import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import ProfileHeader from '../Componentes/ProfileHeader';

type AdminHomeProps = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

const AdminHome: React.FC<AdminHomeProps> = ({ navigation }) => {

    const navigateTo = (screenName: keyof RootStackParamList) => {
        console.log(`Navegando a: ${screenName}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ProfileHeader
                title="Panel de Administrador"
                onEditProfile={() => navigation.navigate('EditarPerfil')}
                onLogout={() => navigation.replace('Home')}
            />
            <View style={styles.header}>
                <Text style={styles.subtitle}>Gestión Central del Sistema</Text>
            </View>

            <View style={styles.container}>

                {/* este boton lo puse para gestionar los servicios iria tipo /GestionarServicios */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigateTo('AdminHome')}
                >
                    <Text style={styles.cardTitle}>Gestionar Servicios</Text>
                    <Text style={styles.cardSubtitle}>Revisar y moderar todas las ofertas publicadas.</Text>
                </TouchableOpacity>

                {/* este es un boton para gestionar los usuarios existentes se va a llamar /GestionarUsuarios */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigateTo('AdminHome')}
                >
                    <Text style={styles.cardTitle}>Gestionar Usuarios</Text>
                    <Text style={styles.cardSubtitle}>Revisar y modificar los roles ya sea clientes o emprendedores).</Text>
                </TouchableOpacity>

                {/* aqui estoy poniendo un boton para reportes */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => console.log('ir a Reportes del Sistema')}
                >
                    <Text style={styles.cardTitle}>Reportes del sistema</Text>
                    <Text style={styles.cardSubtitle}>Ver estadísticas de uso</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#e8f0fe' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 16, color: '#666' },
    container: { padding: 20 },
    card: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        borderLeftWidth: 5,
        borderLeftColor: '#3F51B5',
    },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    cardSubtitle: { fontSize: 14, color: '#777' },
    logoutButton: { marginTop: 30, alignItems: 'center' },
    logoutText: { color: 'red', fontSize: 16, padding: 10, fontWeight: 'bold' }
});

export default AdminHome;