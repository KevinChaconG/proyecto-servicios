import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import { actualizarUsuario } from '../api/usuarioApi';

type EditarPerfilProps = NativeStackScreenProps<RootStackParamList, 'EditarPerfil'>;

// ⚠️ SIMULACIÓN: Este ID DEBE ser el ID real del usuario logueado (ej: obtenido del context o AsyncStorage)
const ID_USUARIO_LOGUEADO = 5; 

const EditarPerfilScreen: React.FC<EditarPerfilProps> = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    
    const [cargando, setCargando] = useState(false);
    const [cargandoInicial, setCargandoInicial] = useState(true);

    useEffect(() => {
        // En un proyecto real, aquí harías un GET /usuarios/:id para obtener los datos
        // Usaremos datos simulados para llenar el formulario inicialmente:
        setTimeout(() => {
            setNombre('Juan');
            setApellido('Pérez');
            setTelefono('50499887766');
            // Nota: No se carga la contraseña.
            setCargandoInicial(false);
        }, 1000);
        
        // En el futuro, se implementaría el fetch real:
        // fetchUsuario(ID_USUARIO_LOGUEADO).then(data => { setNombre(data.nombre); ... });
    }, []);


    const handleGuardarCambios = async () => {
        if (!nombre) {
            Alert.alert('Error', 'El nombre es obligatorio.');
            return;
        }

        setCargando(true);

        const datosParaEnviar = {
            nombre,
            apellido,
            telefono: telefono || undefined,
            ...(password && { password }), 
        };


        try {
            // Llamada a la API de actualización
            const usuarioActualizado = await actualizarUsuario(
                ID_USUARIO_LOGUEADO, 
                datosParaEnviar
            );

            Alert.alert('Éxito', '¡Tus datos han sido actualizados!');
            
            // Opcional: limpiar el campo de password después del éxito
            setPassword(''); 

            // Aquí deberías actualizar tu contexto/AsyncStorage con los nuevos datos (nombre, apellido, etc.)

        } catch (error: any) {
            console.error('Error al actualizar:', error);
            Alert.alert('Error al Guardar', error.message || 'Hubo un error al actualizar el perfil.');
        } finally {
            setCargando(false);
        }
    };

    if (cargandoInicial) {
        return (
            <View style={styles.cargandoContainer}>
                <Text>Cargando datos del perfil...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Text style={styles.helpText}>Solo edita los campos que desees cambiar.</Text>

            <Text style={styles.label}>Nombre (*)</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Nombre"
            />
            
            <Text style={styles.label}>Apellido</Text>
            <TextInput
                style={styles.input}
                value={apellido || ''}
                onChangeText={setApellido}
                placeholder="Apellido"
            />

            <Text style={styles.label}>Teléfono</Text>
            <TextInput
                style={styles.input}
                value={telefono || ''}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
                placeholder="Teléfono (Ej: 99887766)"
            />

            <Text style={styles.label}>Nueva Contraseña (Dejar vacío si no quieres cambiar)</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Ingresar solo para cambiar la contraseña"
            />

            <View style={styles.buttonContainer}>
                <Button 
                    title={cargando ? 'Guardando...' : 'Guardar Cambios'}
                    onPress={handleGuardarCambios}
                    disabled={cargando}
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Volver"
                    onPress={() => navigation.goBack()}
                    color="#888"
                />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    cargandoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 15 },
    helpText: { fontSize: 14, color: '#007AFF', marginBottom: 20, fontStyle: 'italic' },
    label: { fontSize: 16, marginBottom: 5, fontWeight: '600', color: '#555' },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 10,
    }
});

export default EditarPerfilScreen;