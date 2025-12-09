import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert, ActivityIndicator, } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import { useAuth } from '../Context/AuthContext';
import ProfileHeader from '../Componentes/ProfileHeader';
import { crearTrabajoEmprendedor } from '../api/TrabajoApi';

type Props = NativeStackScreenProps<RootStackParamList, 'EmprendedorPublicarServicio'>;

const EmprendedorPublicarServicio: React.FC<Props> = ({ navigation }) => {
    const { usuario } = useAuth();

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [contactoEmail, setContactoEmail] = useState(usuario?.email || '');
    const [direccionTrabajo, setDireccionTrabajo] = useState('');
    const [cargando, setCargando] = useState(false);

    const [region, setRegion] = useState<Region | null>(null);
    const [tienePermiso, setTienePermiso] = useState<boolean | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setTienePermiso(false);
                return;
            }

            setTienePermiso(true);

            const ubicacion = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = ubicacion.coords;

            const initialRegion: Region = {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };

            setRegion(initialRegion);
            setSelectedLocation({ latitude, longitude });
        })();
    }, []);

    const handlePublicar = async () => {
        if (!usuario) {
            Alert.alert('Error', 'No hay un emprendedor en sesión.');
            return;
        }

        if (!titulo || !descripcion || !precio) {
            Alert.alert('Error', 'Título, descripción y precio son obligatorios.');
            return;
        }

        const precioNumber = Number(precio);
        if (isNaN(precioNumber) || precioNumber <= 0) {
            Alert.alert('Error', 'El precio debe ser un número mayor a 0.');
            return;
        }

        if (!selectedLocation) {
            Alert.alert(
                'Ubicación requerida',
                'Por favor selecciona la ubicación en el mapa (mueve el marcador si es necesario).'
            );
            return;
        }

        setCargando(true);

        try {
            const nuevoServicio = {
                titulo,
                descripcion,
                precio: precioNumber,
                contactoEmail,
                idEmprendedor: usuario.id_usuario,
                direccion_trabajo: direccionTrabajo,
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
            };

            await crearTrabajoEmprendedor({
                id_emprendedor: usuario.id_usuario,
                descripcion,
                precio_acordado: precioNumber,
                direccion_trabajo: direccionTrabajo || null,
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
                estado: 'DISPONIBLE', // o lo que uses (OPCIONAL)
            });

            const respuesta = await fetch('http://TU_IP_O_DOMINIO:5050/servicios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoServicio),
            });

            if (!respuesta.ok) {
                const errorBody = await respuesta.text();
                console.log('Error backend:', errorBody);
                throw new Error('Error al publicar servicio');
            }

            Alert.alert('Éxito', 'Servicio publicado correctamente.');

            setTitulo('');
            setDescripcion('');
            setPrecio('');
            setDireccionTrabajo('');

        } catch (error: any) {
            console.error('Error al publicar servicio:', error);
            Alert.alert(
                'Error',
                error?.message || 'Ocurrió un problema al publicar el servicio.'
            );
        } finally {
            setCargando(false);
        }
    };

    const renderMapa = () => {
        if (tienePermiso === false) {
            return (
                <View style={styles.mapaPlaceholder}>
                    <Text style={{ textAlign: 'center' }}>
                        No se otorgaron permisos de ubicación.{"\n"}
                        Puedes habilitarlos desde la configuración del dispositivo.
                    </Text>
                </View>
            );
        }

        if (!region) {
            return (
                <View style={styles.mapaPlaceholder}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando mapa...</Text>
                </View>
            );
        }

        return (
            <MapView
                style={styles.mapa}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        draggable
                        title="Ubicación del trabajo"
                        description="Mantén presionado y arrastra para ajustar"
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setSelectedLocation({ latitude, longitude });
                        }}
                    />
                )}
            </MapView>
        );
    };

    return (
        <View style={styles.safeArea}>
            <ProfileHeader
                title="Publicar Servicio"
                onEditProfile={() => navigation.navigate('EditarPerfil')}
                onLogout={() => navigation.replace('Home')}
            />

            <ScrollView style={styles.container}>
                <Text style={styles.title}>Crear un nuevo servicio</Text>

                <Text style={styles.label}>Nombre del servicio (*)</Text>
                <TextInput
                    style={styles.input}
                    value={titulo}
                    onChangeText={setTitulo}
                />

                <Text style={styles.label}>Descripción (*)</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    placeholder="Describe qué ofreces, experiencia, horarios, etc."
                    multiline
                    numberOfLines={4}
                />

                <Text style={styles.label}>Precio aproximado (Lps) (*)</Text>
                <TextInput
                    style={styles.input}
                    value={precio}
                    onChangeText={setPrecio}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Correo de contacto</Text>
                <TextInput
                    style={styles.input}
                    value={contactoEmail}
                    onChangeText={setContactoEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Dirección de trabajo</Text>
                <TextInput
                    style={styles.input}
                    value={direccionTrabajo}
                    onChangeText={setDireccionTrabajo}
                />

                <Text style={styles.label}>Ubicación en el mapa</Text>
                <Text style={styles.helperText}>
                    Mueve el marcador para indicar dónde se realizará normalmente el trabajo.
                </Text>
                <View style={styles.mapaContainer}>{renderMapa()}</View>

                {selectedLocation && (
                    <Text style={styles.coords}>
                        Lat: {selectedLocation.latitude.toFixed(6)} | Lng:{' '}
                        {selectedLocation.longitude.toFixed(6)}
                    </Text>
                )}

                <View style={styles.buttonContainer}>
                    <Button
                        title={cargando ? 'Publicando...' : 'Publicar Servicio'}
                        onPress={handlePublicar}
                        disabled={cargando}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Volver" onPress={() => navigation.goBack()} color="#888" />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    helpText: {
        fontSize: 14,
        color: '#007AFF',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: '600',
        color: '#555',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 15,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    helperText: {
        fontSize: 12,
        color: '#777',
        marginBottom: 6,
    },
    mapaContainer: {
        marginTop: 8,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 250,
        marginBottom: 10,
    },
    mapa: {
        flex: 1,
    },
    mapaPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coords: {
        marginTop: 4,
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default EmprendedorPublicarServicio;
