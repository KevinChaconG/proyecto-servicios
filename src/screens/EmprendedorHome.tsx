import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';


type EmprendedorHomeProps = NativeStackScreenProps<RootStackParamList, 'EmprendedorHome'>;

const EmprendedorHome: React.FC<EmprendedorHomeProps> = ({ navigation }) => {
    const navigateTo = (screenName: keyof RootStackParamList) => {
        console.log(`Navegando a: ${screenName}`); 
        // navigation.navigate(screenName as any); // esto lo tengo que descomentar despues
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hola, Emprendedor(a) 👋</Text>
                <Text style={styles.subtitle}>Panel de Gestión de Servicios</Text>
            </View>

            <View style={styles.container}>
                
                {/* aqui voy a poner el botón para Gestionar Servicios ya sea editar o publicar aqui puede ir /publicarServicio*/}
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigateTo('')}
                >
                    <Text style={styles.cardTitle}>Servicios Publicados</Text>
                    <Text style={styles.cardSubtitle}>Administrá, editá o añadí nuevas ofertas de trabajo</Text>
                </TouchableOpacity>

                {/* en este boton van a ir las solicitudes tipo /VerSolicitudes */}
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigateTo('')}
                >
                    <Text style={styles.cardTitle}>Ver Solicitudes</Text>
                    <Text style={styles.cardSubtitle}>Revisa los pedidos de contacto de tus clientes.</Text>
                </TouchableOpacity>

                {/* este boton va a ser para editar el perfil eriatipo /EditarPerfil */}
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigateTo('')}
                >
                    <Text style={styles.cardTitle}>Editar Perfil</Text>
                    <Text style={styles.cardSubtitle}>Actualiza tu información y datos de contacto.</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={() => navigation.replace('Home')}
                >
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 16, color: '#555' },
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
    logoutButton: { marginTop: 30, alignItems: 'center' },
    logoutText: { color: 'red', fontSize: 16, padding: 10, fontWeight: 'bold' }
});

export default EmprendedorHome;