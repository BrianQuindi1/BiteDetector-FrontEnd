import React from 'react'
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardHistorialPicaduras from '../components/CardHistorialPicaduras';

const HistorialPicaduras = () => {
  
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <CardHistorialPicaduras/>
    </SafeAreaView>
  )
}

export default HistorialPicaduras