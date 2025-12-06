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



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />

      { }
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        { }
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ClientHome" component={ClientHomeScreen} />
        <Stack.Screen name="DetalleServicio" component={DetalleServicio} />
        <Stack.Screen name="ContactoEmprendedor" component={EmprendedorContactScreen} />

        { }

      </Stack.Navigator>
    </NavigationContainer>
  );
}
