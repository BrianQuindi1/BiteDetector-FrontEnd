import React from 'react'
import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardContacto107 from '../components/CardContacto107';

const ContactosDeEmergencia = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fuenteTitulo}>Contactos generales</Text>
      <CardContacto107 />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F8F8EC',
      justifyContent: 'center',
  },
  statusBar:{
    backgroundColor: '#F8F8EC'
  },
  fuenteTitulo:{
    fontSize: 18,
    //fontFamily: "arial"
  }
});


export default ContactosDeEmergencia