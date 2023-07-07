import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
/*import contactosDeEmergencia from '../screens/contactosDeEmergencia';
import historialPicaduras from '../screens/historialPicaduras';
import scanner from '../screens/scanner';*/
import iniciarSesion from '../screens/iniciarSesion';
import Registrarse from '../screens/Registrarse.js';
import { useNavigation } from '@react-navigation/native';

const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="iniciarSesion" component={iniciarSesion}/>
      <HomeStack.Screen name="Registrarse" component={Registrarse}/>
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen