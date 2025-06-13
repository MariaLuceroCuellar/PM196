import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';
    const Texto = ()=>{
      const [contenido, setContenido] = useState('Hola Mundo');
      const actualizarContenido = () => {
        setContenido('¡Contenido actualizado!');
      }
      return (
        <Text onPress={actualizarContenido}> {contenido} </Text>
      )
      
    }
export default function App() {
  const [contenido, setContenido] = useState('Click me');
  const actualizarContenido = () => {
    setContenido('holiii');
  }
  return (
    <View style={styles.container}>
      <Texto>  </Texto>
      <Button title={contenido} onPress={actualizarContenido} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
