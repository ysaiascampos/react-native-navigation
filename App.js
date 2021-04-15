import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Ir a detalle"
        onPress={()=> navigation.navigate('Detalle', { user_id: 2})}
      />
      <StatusBar style="auto" />
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'home'
}

const DetalleScreen = ({ navigation }) => {
  const lala = navigation.getParam('lala', 'valor por defecto');

  return (
    <View style={styles.container}>
      <Text>Soy la pantalla de detalles {lala}</Text>
      <Button
        title="volver"
        onPress={()=> navigation.setParams({title: 'Usuario 1'})}
      />
      <StatusBar style="auto" />
    </View>
  );
}

DetalleScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Cargando..')
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detalle: {
    screen: DetalleScreen
  }
}, { initialRouteName: 'Home'})

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
