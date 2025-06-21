import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import React, {useState} from 'react';

const showAlert = (message) => {
    if(Platform.OS === 'web'){
        window.alert(message);

    }else{
        Alert.alert('Alert', message)
    }

}
export default function App() {
    return(
        <View style={styles.container}>
            <Text style={styles.texto}> React Native Button test</Text>
            <View style={styles.section}>
                <Text style={styles.description}> Botón Básico</Text>
                <Button
                    title="Da click"
                    onPress={() => showAlert('Boton Presionado!')}
                ></Button>
            </View>
            <View  style={styles.section}>
                <Text style= {styles.description}>Boton con color</Text>
                <Button 
                    title='Boton con color'
                    color='pink'
                    onPress={() => showAlert('Boton de color presionado!')}
                ></Button>
            </View>
            <View  style={styles.section}>
                <Text style={styles.description}>Boton con color y deshabilitado</Text>
                <Button 
                    title='Boton deshabilitado'
                    color='grey'
                    disabled
                    onPress={() => showAlert('Boton deshabilitado presionado!')}
                ></Button>
            </View>
            <View style={styles.section}>
                <Text style={styles.description}> dos botones</Text>
                <View style={styles.buttonRow}>
                    <Button
                        title= 'Izquierda'
                        onPress={() => showAlert('Boton Izquierda presionado!')  }
                    ></Button>
                
                
                    <Button
                        title= 'Derecha'
                        onPress={() => showAlert('Boton Derecha presionado!')  }
                    ></Button>
                    
                </View>
            </View>
            <StatusBar style="auto" />
            
        </View>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        
    

    },
    description: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonSpacer:{
            width: 10, 
        }
});
