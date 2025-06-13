import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

    const Texto = (props)=>{
      const {children} = props;
      return (
        <Text> {children} </Text>
      )
      
    }
export default function App() {
  return (
    <View style={styles.container}>
      <Texto> "Hola" </Texto>
      <Texto> "Mundo" </Texto>
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
