import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEntrepreneur, setIsEntrepreneur] = useState(false);

    const handleRegister = () => {
        console.log('Registro con datos:', { name, email, password, role: isEntrepreneur ? 'Emprendedor' : 'Cliente' });
        
        navigation.navigate('Login');
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

            <Button title="Registrarse" onPress={handleRegister} />
            
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