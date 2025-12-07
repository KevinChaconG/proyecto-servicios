import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen'; 
import { crearSolicitudTrabajo } from '../api/TreabajoApi';

type EmprendedorContactProps = NativeStackScreenProps<RootStackParamList, 'ContactoEmprendedor'>;

const EmprendedorContactScreen: React.FC<EmprendedorContactProps> = ({ route, navigation }) => {
    const { idServicio, nombreEmprendedor, idEmprendedor } = route.params; 

    const [mensaje, setMensaje] = useState('');
    const [direccion, setDireccion] = useState('');
    const [cargando, setCargando] = useState(false);

    const idClienteSimulado = 5; 
    
    const handleEnviarSolicitud = async () => {
        if (!mensaje || !direccion) {
            Alert.alert('Datos Faltantes', 'Por favor, proporcioná un mensaje y la dirección para el trabajo.');
            return;
        }

        setCargando(true);

        const idEmprendedorNumerico = Number(idEmprendedor);
        if (isNaN(idEmprendedorNumerico)) {
            Alert.alert('Error', 'ID de emprendedor inválido.');
            setCargando(false);
            return;
        }

        try {
            await crearSolicitudTrabajo({
                id_servicio: idServicio,
                id_cliente: idClienteSimulado, 
                id_emprendedor: idEmprendedorNumerico,
                direccion_trabajo: direccion,
                mensaje_cliente: mensaje,
            });
            
            Alert.alert(
                'Solicitud Enviada ✅', 
                `Tu solicitud para ${nombreEmprendedor} ha sido enviada con éxito. Ya podés coordinar con él.`
            );
            navigation.goBack(); 

        } catch (error: any) {
            Alert.alert('Error', error.message || 'No se pudo enviar la solicitud. Verificá la conexión del backend.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Solicitar Servicio</Text>
            <Text style={styles.subtitle}>
                Estás contactando a: <Text style={styles.boldText}>{nombreEmprendedor}</Text>
            </Text>
            
            <View style={styles.section}>
                <Text style={styles.label}>Mensaje/Detalles del Trabajo:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describí lo que necesitás (tiempo, detalles, equipo, etc.)"
                    multiline
                    numberOfLines={4}
                    value={mensaje}
                    onChangeText={setMensaje}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Dirección del Trabajo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Calle, número, colonia, barrio, etc."
                    value={direccion}
                    onChangeText={setDireccion}
                />
            </View>

            <Button
                title={cargando ? 'Enviando...' : 'Enviar Solicitud'}
                onPress={handleEnviarSolicitud}
                disabled={cargando}
            />

            <View style={styles.linkContainer}>
                <Button 
                    title="Cancelar y Volver" 
                    onPress={() => navigation.goBack()}
                    color="#888"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 25, backgroundColor: '#f9f9f9' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
    boldText: { fontWeight: 'bold', color: '#333' },
    section: { marginBottom: 15 },
    label: { fontSize: 16, marginBottom: 5, color: '#333' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    textArea: { 
        height: 100, 
        textAlignVertical: 'top' 
    },
    linkContainer: { marginTop: 20 },
});

export default EmprendedorContactScreen;