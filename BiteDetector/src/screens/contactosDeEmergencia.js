import React from 'react'
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const contactosDeEmergencia = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Este es el contactosDeEmergencia</Text>
    </View>
  )
}

export default contactosDeEmergencia