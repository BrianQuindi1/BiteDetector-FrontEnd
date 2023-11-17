import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactosDeEmergencia from '../screens/contactosDeEmergencia.js';
import FormAgregarContacto from '../screens/FormAgregarContacto.js';

const ContactoStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Contactos de Emergencia" component={ContactosDeEmergencia}/>
      <HomeStack.Screen name="FormAgregarContacto" component={FormAgregarContacto}/>
    </HomeStack.Navigator>
  );
};

export default ContactoStackScreen;