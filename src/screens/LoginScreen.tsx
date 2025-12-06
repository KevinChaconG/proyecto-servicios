import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreeen';
import { login } from '../api/usuarioApi';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) { 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);

  /*function manejarRedireccion(rol: string) {
        Alert.alert('Simulación de Redirección', `Redirigiendo como ${rol}.`);
        navigation.replace('Home');
   }*/

  async function manejarLogin(): Promise<void> {
  try {
    setCargando(true);
    // const respuesta = await login(email, password);

    Alert.alert('Éxito', 'Login simulado exitoso.');

    navigation.replace('ClientHome');

} catch (error: any) {
} finally {
}
}

  return (
    <View style={styles.container}>
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


