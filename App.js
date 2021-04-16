import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
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

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Detalle: {
    screen: DetalleScreen
  }
}, { 
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon:({ focused, horizontal, tintColor}) => {
      const { routeName } = navigation.state;
      let iconName
      if (routeName === "Home"){
        iconName = `ios-information-circle${focused ? '' : '-outline'}`
      } else {
        iconName = `ios-options`
      }
      return <Ionicons name={iconName} size={20} tontColor={tintColor} />
    },
    tabBarOptions: {
      activeTintColor: navigation.state.routeName === "Home" ? '#e91e63' : 'orange',
      inactiveTintColor: 'black',
      labelStyle: {
        fontSize: 16,
      },
      style: {
        backgroundColor: '#fec',
      }
    }
  })
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
