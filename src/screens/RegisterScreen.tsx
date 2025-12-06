import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import { register } from '../api/usuarioApi';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEntrepreneur, setIsEntrepreneur] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Datos Incompletos', 'tenés que completar el Nombre, Email y Contraseña.');
            return;
        }

        setCargando(true);

        try {
            const rol = isEntrepreneur ? 'EMPRENDEDOR' : 'CLIENTE';
            
            await register({
                nombre: name,
                email: email,
                password: password,
                rol_usuario: rol,
            });

            Alert.alert('¡Registro Con Exito!', 'Tu cuenta se creó. Ahora podés iniciar sesión.');
            navigation.navigate('Login');

        } catch (error: any) {
            console.error('Error durante el registro:', error);
            Alert.alert('Error de Registro', error.message || 'Ocurrió un error al intentar crear la cuenta.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nueva Cuenta</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>Soy Emprendedor:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEntrepreneur ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={setIsEntrepreneur}
                    value={isEntrepreneur}
                />
                <Text style={styles.roleStatus}>{isEntrepreneur ? 'Sí' : 'No (Soy Cliente)'}</Text>
            </View>

            <Button 
                title={cargando ? 'Registrando...' : 'Registrarse'} 
                onPress={handleRegister} 
                disabled={cargando}
            />
            
            <View style={styles.linkContainer}>
                <Button title="Ya tengo una cuenta (Login)" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 30 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 5 },
    roleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' },
    roleLabel: { fontSize: 16, marginRight: 10 },
    roleStatus: { fontSize: 16, fontWeight: 'bold' },
    linkContainer: { marginTop: 20 },
});

export default RegisterScreen;