import React, { useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardContacto107 from '../components/CardContacto107';
import axios from 'axios';
import UsuarioService from '../services/UsuarioServices';
import agregarContacto from '../../assets/agregarContacto.png';
import FormAgregarContacto from './FormAgregarContacto';
import API from '../API';
import CardContact from "../components/CardContact"


const ContactosDeEmergencia = () => {
  const navigation = useNavigation();
  const usuarioServices = new UsuarioService();
  useEffect( async () => {
   /*  let perfil = await usuarioService.obtenerCredenciales();
    let IdUsuario = perfil.IdUsuario; */

    const contactosUsuario = [];
    const url = API.ApiContacto + IdUsuario;
    
    try {
      const response = await axios.get(url);
      const contacto = {
        Nombre: response.data.Nombre,
        Numero: response.data.Numero,
        IdUsuario: response.data.IdUsuario
      };
    
      // Agregar el contacto al array existente
      contactosUsuario.push(contacto);
    } catch (error) {
      // Manejar errores de la solicitud (por ejemplo, conexión perdida, error en el servidor, etc.)
      console.error('Error al obtener los contactos:', error);
    }
  
  }, []);
  
   
  return (
     <SafeAreaView style={styles.container}>
      <Text style={styles.fuenteTitulo}>Contactos generales</Text>
       <CardContacto107 style={styles.contactosGenerales}/>
       <View>
       {contactosUsuario.map((contacto, index) => (
        <CardContact key={index} contacto={contacto} />
      ))}
       </View>
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