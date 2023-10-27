import React from 'react'
import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardContacto107 from '../components/CardContacto107';
import axios from 'axios'
import { View } from 'react-native-web';

const ContactosDeEmergencia = () => {
  //const navigation = useNavigation();
   
  return (
     <SafeAreaView style={styles.container}>
      <Text style={styles.fuenteTitulo}>Contactos generales</Text>
       <CardContacto107 style={styles.contactosGenerales}/>
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
    fontSize: 18
  },
  contactosGenerales:{
    marginBottom: 360
  }
});


export default ContactosDeEmergencia