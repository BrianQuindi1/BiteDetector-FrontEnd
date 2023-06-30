import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import contactosDeEmergencia from '../screens/contactosDeEmergencia';
import historialPicaduras from '../screens/historialPicaduras';
import iniciarSesion from '../screens/iniciarSesion';
import scanner from '../screens/scanner';

const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="scanner" component={scanner}/>
      <HomeStack.Screen name="contactosDeEmergencia" component={contactosDeEmergencia}/>
      <HomeStack.Screen name="historialPicaduras" component={historialPicaduras}/>
      <HomeStack.Screen name="iniciarSesion" component={iniciarSesion}/>
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen