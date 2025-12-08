import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';

type DetalleServicioProps = NativeStackScreenProps<RootStackParamList, 'DetalleServicio'>;

const DetalleServicio: React.FC<DetalleServicioProps> = ({ route, navigation }) => {
    const { titulo, emprendedor, descripcion, precio, contactoEmail, id, idEmprendedor } = route.params;

    const manejarContacto = () => {
        navigation.navigate('ContactoEmprendedor', {
            idServicio: id,
            idEmprendedor: idEmprendedor,
            nombreEmprendedor: emprendedor,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{titulo}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalles del Emprendedor</Text>
                    <Text style={styles.infoText}>Ofrecido por: {emprendedor}</Text>
                    {contactoEmail && <Text style={styles.infoText}>Email de Contacto: {contactoEmail}</Text>}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Descripción del Servicio</Text>
                    <Text style={styles.descriptionText}>{descripcion}</Text>
                </View>

                {precio !== undefined && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Precio Estimado</Text>
                        <Text style={styles.priceText}>${precio.toFixed(2)}</Text>
                    </View>
                )}

            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Contactar al Emprendedor"
                    onPress={manejarContacto}
                />
                <Button
                    title="Volver a Servicios"
                    onPress={() => navigation.goBack()}
                    color="#888"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, padding: 20 },
    title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    section: { marginBottom: 25, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#007AFF' },
    infoText: { fontSize: 16, marginBottom: 5, color: '#555' },
    descriptionText: { fontSize: 16, lineHeight: 24, color: '#333' },
    priceText: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50' },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
});

export default DetalleServicio;