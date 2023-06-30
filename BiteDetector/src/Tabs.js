import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/HomeStackScreen";
import SettingsStackScreen from "./stacks/SettingsStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import contactosDeEmergencia from './screens/contactosDeEmergencia';
import historialPicaduras from './screens/historialPicaduras';
import iniciarSesion from './screens/iniciarSesion';
import scanner from './screens/scanner';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="scanner" component={scanner}/>
        <Tab.Screen name="contactosDeEmergencia" component={contactosDeEmergencia}/>
        <Tab.Screen name="historialPicaduras" component={historialPicaduras}/>
        <Tab.Screen name="iniciarSesion" component={iniciarSesion}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;