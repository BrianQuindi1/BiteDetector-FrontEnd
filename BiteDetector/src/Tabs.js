import React from "react";
import {StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/HomeStackScreen";
//import SettingsStackScreen from "./stacks/SettingsStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import ContactosDeEmergencia from './screens/contactosDeEmergencia';
import HistorialPicaduras from './screens/historialPicaduras';
import Scanner from './screens/scanner.js';

import iniciarSesion from '../assets/iniciarSesion.png';
import historialPicaduras from '../assets/historialPicaduras.png';
import scanner from '../assets/scanner.png';
import contactosDeEmergencia from '../assets/contactosDeEmergencia.png';
import Perfil from './screens/Perfil';


const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer /*style={{color: 'green'}}*/>
      <Tab.Navigator 
        screenOptions={{ headerShown: false }}
        tabBarOptions={{
          style: {
            backgroundColor: 'blue', // Cambia el color de fondo aquí
          },
        }}
      >
        <Tab.Screen 
          name="Scanner" 
          component={Scanner}
          options={{
            tabBarIcon: () => (
              <Image source={scanner} style={{ width: 50, height: 50 }} />
            )
          }}
        />
        <Tab.Screen 
          name="Contactos" 
          component={ContactosDeEmergencia}
          options={{
            tabBarIcon: () => (
              <Image source={contactosDeEmergencia} style={{ width: 30, height: 30 }} />
            )
          }}
        />
        <Tab.Screen 
          name="Historial" 
          component={HistorialPicaduras}
          options={{
            tabBarIcon: () => (
              <Image source={historialPicaduras} style={{ width: 30, height: 30 }} />
            )
          }}
        />
        <Tab.Screen 
        name="Perfil" 
        component={HomeStackScreen}
        options={{
          tabBarIcon: () => (
            <Image source={iniciarSesion} style={{ width: 30, height: 30 }} />
          )
        }}
        />
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