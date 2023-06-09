import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/HomeStackScreen";
import SettingsStackScreen from "./stacks/SettingsStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import contactosDeEmergencia from './screens/contactosDeEmergencia';
import historialPicaduras from './screens/historialPicaduras';
import iniciarSesion from './screens/iniciarSesion.js';
import scanner from './screens/scanner.js';
import Registrarse from "./screens/registrarse.js";


const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Scanner" component={scanner}/>
        <Tab.Screen name="Contactos" component={contactosDeEmergencia}/>
        <Tab.Screen name="Historial" component={historialPicaduras}/>
        <Tab.Screen name="Perfil" component={HomeStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  nav: {
    color: '#AEDD2B'
  },
  logos: {
    color: '#066699'
  }
})