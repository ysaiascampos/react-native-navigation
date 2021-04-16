import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

const Logo = () => <Text>LALALA</Text>;

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Ir a detalle"
        onPress={()=> navigation.navigate('Detalle')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

HomeScreen.navigationOptions = {
  drawerIcon:({ tintColor }) => {
    return <Ionicons name='ios-information-circle' size={25} color={tintColor} />
  },
  headerTitle: () => <Logo />,
  headerStyle: {
    backgroundColor: '#f00',
  },
}

const DetalleScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0);
  const incrementar = () => setCont(cont + 1)
  useEffect(() => {
    navigation.setParams({incrementar})
  }, [cont])

  const lala = navigation.getParam('lala', 'valor por defecto');

  return (
    <View style={styles.container}>
      <Text>Soy la pantalla de detalles {cont }</Text>
      <Button
        title="volver"
        onPress={()=> navigation.navigate("MiModal")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

DetalleScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Cargando..'),
    headerRight:()=> (
      <Button
        onPress={navigation.getParam('incrementar')}
        title="Mas 1"
        color='#555'
      />
    ),
  }
}

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: HomeScreen
  },
  Detalle: {
    screen: DetalleScreen
  }
}, { 
  initialRouteName: 'Home',
  
})

const RootStack = createStackNavigator({
  Main: AppNavigator,
  MiModal: () => <Text>lololololo</Text>
},{
  mode: 'modal',
  headerMode: 'none',
})

export default createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
