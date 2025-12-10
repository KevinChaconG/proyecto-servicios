import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen, { RootStackParamList } from './src/screens/HomeScreeen';
import RegisterScreen from './src/screens/RegisterScreen';
import ClientHomeScreen from './src/screens/ClientHomeScreen';
import DetalleServicio from './src/screens/DetalleServicioScreen';
import EmprendedorContactScreen from './src/screens/EmprendedorContactScreen';
import EmprendedorHome from './src/screens/EmprendedorHome';
import EditarPerfilScreen from './src/screens/EditarPerfilScreen';
import AdminHome from './src/screens/AdminHome';
import { AuthProvider } from './src/Context/AuthContext';
import EmprendedorPublicarServicio from './src/screens/EmprendedorPublicarServicio';
import EmprendedorServicios from './src/screens/EmprendedorServicios';
import EmprendedorSolicitudes from './src/screens/EmprendedorSolicitudes';
import ClientSolicitudes from './src/screens/ClientSolicitudes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ClientHome" component={ClientHomeScreen} />
        <Stack.Screen name="DetalleServicio" component={DetalleServicio} />
        <Stack.Screen name="ContactoEmprendedor" component={EmprendedorContactScreen} />
        <Stack.Screen name="EmprendedorHome" component={EmprendedorHome} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ title: 'Mi Perfil' }}/>
        <Stack.Screen name="EmprendedorPublicarServicio"component={EmprendedorPublicarServicio}/>
        <Stack.Screen name="EmprendedorServicios" component={EmprendedorServicios}/>
        <Stack.Screen name="EmprendedorSolicitudes" component={EmprendedorSolicitudes} />
        <Stack.Screen name="ClientSolicitudes"component={ClientSolicitudes}/>

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
