import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({navigation}) {
  return (
    
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={28} color="green" />
        <Text style={styles.title}> Perfil de usuario </Text>
          <Pressable style={[styles.button]} onPress={() => navigation.navigate('Detalles')}>
              <Text style={styles.buttonText}>Detalles de Usuario</Text>
          </Pressable>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'green',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    marginBottom: 20, 
    width: '70%', 
    alignItems: 'center',
    backgroundColor: '#e684ffff'

},
buttonText: {
    color: '#fff', 
    fontWeight: '600',
    textAlign: 'center',
}

});