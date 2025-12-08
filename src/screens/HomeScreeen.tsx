import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'react-native';

export interface ServiceDetailParams {
    id: string;
    titulo: string;
    emprendedor: string;
    idEmprendedor: string;
    descripcion: string;
    precio?: number;
    contactoEmail?: string;
    calificacionPromedio: number;
}

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    ClientHome: undefined;
    EmprendedorHome: undefined;
    AdminHome: undefined;
    DetalleServicio: ServiceDetailParams;
    ContactoEmprendedor: {
        idServicio: string;
        idEmprendedor: string;
        nombreEmprendedor: string;
    };
    EditarPerfil: undefined;
    EmprendedorPublicarServicio: undefined;
    EmprendedorServicios: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={{ width: 300, height: 300, alignSelf: 'center'}}
                resizeMode="contain"
            />

            <Text style={styles.title}>¡Bienvenido a Mi Chambita!</Text>
            <Text style={styles.subtitle}>Encontrá o publicá servicios facilmente</Text>
            <Button
                title="Ingresar a la Aplicación"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    
});

export default HomeScreen;