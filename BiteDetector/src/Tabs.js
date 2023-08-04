import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/HomeStackScreen";
import SettingsStackScreen from "./stacks/SettingsStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import ContactosDeEmergencia from './screens/ContactosDeEmergencia';
import HistorialPicaduras from './screens/HistorialPicaduras';
import Scanner from './screens/Scanner.js';


const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Scanner" component={Scanner}/>
        <Tab.Screen name="Contactos" component={ContactosDeEmergencia}/>
        <Tab.Screen name="Historial" component={HistorialPicaduras}/>
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