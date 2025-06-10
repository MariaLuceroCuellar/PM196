import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

    const Texto = ()=>{
      return (
        <Text>Hola Mundo </Text>
      )
      
    }
export default function App() {
  return (
    <View style={styles.container}>
      <Texto />
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Click Me" />
      <Texto />
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
