import React from 'react'
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardContacto107 from '../components/CardContacto107';
import axios from 'axios'
import { View } from 'react-native-web';
import UsuarioService from '../services/UsuarioServices';
import agregarContacto from '../../assets/agregarContacto.png';
import FormAgregarContacto from './FormAgregarContacto';

const ContactosDeEmergencia = () => {
  const navigation = useNavigation();
  const usuarioService = new UsuarioService();
   
  return (
     <SafeAreaView style={styles.container}>
      <Text style={styles.fuenteTitulo}>Contactos generales</Text>
       <CardContacto107 style={styles.contactosGenerales}/>
       <TouchableOpacity  style={styles.acomodarBoton} onPress={navigation.navigate("FormAgregarContacto")} >
              <Image source={agregarContacto} style={styles.agregarContactos}>
              </Image>
            </TouchableOpacity>
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
    marginBottom: 10,
    marginLeft: 110,
    fontSize: 18,
    justifyContent: 'center'
  },
  contactosGenerales:{
    marginBottom: 360
  },
  agregarContactos: {
    width: 79,
    height: 79,
  },
  acomodarBoton: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    marginLeft: 159,
  }
});


export default ContactosDeEmergencia