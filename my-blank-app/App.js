import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

    const Texto = (props)=>{
      const {contenido} = props;
      return (
        <Text> {contenido} </Text>
      )
      
    }
export default function App() {
  return (
    <View style={styles.container}>
      <Texto contenido = "Hola"/>
      <Texto contenido = "¿Comó estas?"/>
      <Texto contenido = "Mi nombre es Lucero"/>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Click Me" />
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
