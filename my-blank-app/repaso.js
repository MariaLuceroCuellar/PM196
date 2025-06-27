import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, Switch, Image, ActivityIndicator} from 'react-native';



const App = () =>{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [activo, setActivo] = useState(false);
    const validarDatos = ()=>{
    if (!nombre || !email){
        Alert.alert(
            'Error',
            'Por favor completa todos los campos',
            [{ text: 'OK' }]
        )
    }else if (!activo) {
        Alert.alert(
            'Error',
            'Debes aceptar los términos y condiciones',
            [{ text: 'OK' }]
        );
    }else{
        Alert.alert(
            'Registro exitoso',
            `Nombre: ${nombre}\nEmail: ${email}`,
            [{ text: 'OK' }]
        )
    }
}
    const cambiarSwitch = () => {
        setActivo((previousState) => !previousState);
    }
    const [loading, setLoading] = useState(true);
    
    useEffect ( ()=>{
            setTimeout(()=> setLoading(false), 3000);
    }, []);
    if (loading) {
        return(
            <View style={styles.splash}>
                <Image source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngall.com%2Floading-png%2Fdownload%2F124941%2F&psig=AOvVaw0dn7ZEqLlSEnpzurA7W_iE&ust=1751146248426000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjaiaHGko4DFQAAAAAdAAAAABAE' }} />
                <Text style={styles.splashText}>Cargando...</Text>
                <ActivityIndicator size="large" color="#ffffff"/>
            </View>
        );
    }
    
    return(
        <ImageBackground  
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
            resizeMode="cover"
            style = {styles.container}>
            <View style = {styles.formulario}>
                <Text style = {styles.titulo}>Registro Usuario</Text>

                <TextInput
                    placeholder="Nombre Completo"
                    value = {nombre}
                    onChangeText= {setNombre}
                    style = {styles.input}
                ></TextInput>
                <TextInput
                    placeholder="Email"
                    value = {email}
                    onChangeText= {setEmail}
                    style = {styles.input}
                    keyboardType="email-address">
                </TextInput>
                <View>
                    <Text>Aceptar Terminos Y condiciones </Text>
                    <Switch 
                        onValueChange={cambiarSwitch}
                        value={activo}
                    ></Switch>
                </View>
                <Button
                    title="Registrar"
                    onPress={validarDatos}
                    style={styles.boton}
                    >
                </Button>

            </View>
        </ImageBackground >

    )



}

const styles = StyleSheet.create({
    splash:{
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'

    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    formulario:{
        padding: 20,
        backgroundColor: 'grey',
        backgroundOpacity: 1,
        borderRadius: 10,

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    boton: {
        marginTop: 10,
        width: '100%',
        borderRadius: 5,
    },
});
export default App;