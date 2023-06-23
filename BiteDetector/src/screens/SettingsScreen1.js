/*import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen1 = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Este es settings 1</Text>
      <Button title="ir a home2" onPress={() => navigation.navigate("Home2")} />
    </View>
  );
};

export default SettingsScreen1;*/

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen1 = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>este es el SettingsScreen1</Text>
      <Button title="ir a home2" onPress={() => navigation.navigate("Home2")}></Button>
    </View>
  )
}

export default SettingsScreen1