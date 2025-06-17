import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';
    const Texto = ({style}) =>{
      const [contenido, setContenido] = useState('Hola mundo');
      const actualizarContenido = () => {
        setContenido('¡Contenido actualizado!');
      }
      return (
        <Text style={[styles.text, style]} onPress={actualizarContenido}> 
        {""}
        {contenido} 
        </Text>

      )
      
    }
export default function App() {
  const [contenido, setContenido] = useState('Click me');
  const actualizarContenido = () => {
    setContenido('holiii');
  }
  return (
    <View style={styles.container}>
      <Texto style={styles.rojo}></Texto>
      <Texto style={styles.verde}></Texto>
      <Texto style={styles.amarillo}></Texto>
      <Button title={contenido} onPress={actualizarContenido} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    
  },
    text: {
    color: "white",
    fontSize: 28,
    width: 100,
    height: 100,
  },
  rojo: { backgroundColor: "red" },
  amarillo: { backgroundColor: "yellow" },
  verde: { backgroundColor: "green" },
});
