import React, { useState } from "react";
import { View, Switch, StyleSheet, Text, ImageBackground, ActivityIndicator} from "react-native";

const App = () => {
    return(
            <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
        style={styles.background}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text styele={styles.text}>Bienvenido a la app</Text>
        </View>
    </ImageBackground>

    )


}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 20,
        borderRadius: 10,
        alignSelf:'center'
    },
    text: {
        color: 'White',
        fontSize: 24,
    },
});
export default App;