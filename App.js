import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const Logo = () => <Text>LALALA</Text>;

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

DetalleScreen.navigationOptions = ({navigation, navigationOptions}) => {
  return {
    title: navigation.getParam('title', 'Cargando..'),
    headerRight:()=> (
      <Button
        onPress={navigation.getParam('incrementar')}
        title="Mas 1"
        color='#555'
      />
    ),
    headerStyle: {
      backgroundColor: navigationOptions.headerStyle.backgroundColor,
    },
  }
}

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Detalle: {
    screen: DetalleScreen
  }
}, { 
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fec',
    },
    headerTintColor: '#555',
    headerTitleStyle: {
      fontWeight: '900',
    }
  }
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
