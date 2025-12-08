import React, { useState } from 'react';
import {View,Text,TextInput,Button,Alert,StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import { login } from '../api/usuarioApi';
import { Image } from 'react-native';
import { useAuth } from '../Context/AuthContext';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cargando, setCargando] = useState<boolean>(false);
    const {setUsuario}=useAuth();

    async function manejarLogin(): Promise<void> {
        if (!email || !password) {
            Alert.alert('Aviso', 'Por favor, ingresa tu email y contraseña.');
            return;
        }

        try {
            setCargando(true);

            const respuesta = await login(email, password);
            Alert.alert('Masizo', `¡Bienvenido(a), ${respuesta.usuario.nombre} ${respuesta.usuario.apellido}!`);
            const rol = respuesta.usuario.rol_usuario;

            switch (rol) {
                case 'CLIENTE':
                    navigation.replace('ClientHome');
                    break;
                case 'EMPRENDEDOR':
                    navigation.replace('EmprendedorHome');
                    break;
                case 'ADMIN':
                    navigation.replace('AdminHome');
                    break;
                default:
                    Alert.alert('Error', 'Tu cuenta tiene un rol inválido.');
                    navigation.replace('Home');
                    break;
            }
            

        } catch (error: any) {
            Alert.alert('Error de Acceso', error.message || 'Error de red o credenciales incorrectas.');
        } finally {
            setCargando(false);
            
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={{ width: 180, height: 180, alignSelf: 'center' }}
                resizeMode="contain"
            />

            <Text style={styles.titulo}>Iniciar Sesión</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button
                title={cargando ? 'Ingresando...' : 'Ingresar'}
                onPress={manejarLogin}
                disabled={cargando}
            />

            <View style={styles.linkContainer}>
                <Button
                    title="Aún no tengo usuario (Registrarse)"
                    onPress={() => navigation.navigate('Register')}
                    color="#841584"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
    },
    linkContainer: {
        marginTop: 20,
    },
});


