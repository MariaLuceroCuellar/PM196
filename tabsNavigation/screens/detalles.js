import {View, Text, Pressable, StyleSheet} from 'react-native';

export default function Detalles () {
    return(
        <View style= {styles.container}>
            <Text style={styles.title}>Detalles Usuario</Text>
            <Pressable style={[styles.button]} >
                <Text style={styles.buttonText}>Ir a Perfil</Text>
            </Pressable>

        </View>
    );

}
const styles = StyleSheet.create({
container:{
    flex: 1, 
    backgroundColor: '#fff',  
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 20,
},
title: {
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',

},
button: {
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    width: '80%', 
    alignItems: 'center',

},
buttonText:{
    color: 'blue', 
    fontSize: 16,
    fontWeight: '600',
}
});