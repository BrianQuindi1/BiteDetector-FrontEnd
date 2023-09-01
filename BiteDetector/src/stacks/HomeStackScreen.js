import { View, Text, AsyncStorage } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
/*import contactosDeEmergencia from '../screens/contactosDeEmergencia';
import historialPicaduras from '../screens/historialPicaduras';
import scanner from '../screens/scanner';*/
import IniciarSesion from '../screens/iniciarSesion.js';
import Registrarse from '../screens/registrarse.js';


const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Iniciar Sesion" component={IniciarSesion}/>
      <HomeStack.Screen name="Registrarse" component={Registrarse}/>
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen