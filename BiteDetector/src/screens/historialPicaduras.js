import React from 'react'
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';

const HistorialPicaduras = () => {
  
  const navigation = useNavigation();
  return (
    <View>
      <Card/>
    </View>
  )
}

export default HistorialPicaduras