import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, TextInput, Button, Pressable, Text, View, Image, TouchableOpacity, StatusBar, TouchableOpacityBase} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png'
import API from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Perfil from "../screens/Perfil";
import AsyncUtils from './../AsyncUtils'
import axios from 'axios'
import UsuarioService from '../services/UsuarioServices';

export const IniciarSesion = () => {
  const [text, onchangeText] = React.useState('Useless text');
  const [number, onchangeNumber] = React.useState('');
  const [email, setEmail] = useState("manolisguido@gmail.com");
  const [contraseña, setContraseña] = useState("YummY");
  const [IdUsuario, setIdUsuario] = useState(0);
  const navigation = useNavigation();

  
    let validarSesion = async () => {
      let objeto =
        {
          Mail: email,
          Password: contraseña,
        };

        if(email!= "" || contraseña != "" || email!= "" && contraseña != "")
        {
     
          
          let url = API.ApiUsuario + "login";
          console.log(objeto);
          console.log(url);
          const response = await axios.post(url, objeto)
          console.log(response.data)
          console.log(response.data.Token)

          try{
            if (response.data.Token) {
              // Almacenar el objeto y el token en AsyncStorage
              await AsyncStorage.setItem('usuarioIniciadoSesion', 'true');
              await AsyncStorage.setItem('token', response.data.Token);
             /* let usuarioService = new UsuarioService();
              usuarioService.almacenarCredenciales(email, contraseña); PREGUNTAR BIEN SI ESTO SIRVE O NO*/
              // Redirigir al perfil u otra pantalla
              navigation.navigate('Perfil');
            } else {
              alert("El email o contraseña son inválidos");
            }
          }
          catch (e) {
            console.log(e);
          }
           /*  try{
            if (response.data.Token) {
              // Almacenar el objeto y el token en AsyncStorage
              let usuarioService = new UsuarioService();
              let inicio = await usuarioService.almacenarCredenciales(response.data.Mail, response.data.Password, response.data.Nombre)
              inicio = await AsyncStorage.setItem('usuarioIniciadoSesion', 'true');
              await AsyncStorage.setItem('token', response.data.Token);
             {/* let usuarioService = new UsuarioService();
            usuarioService.almacenarCredenciales(email, contraseña); PREGUNTAR BIEN SI ESTO SIRVE O NO 
              // Redirigir al perfil u otra pantalla
              navigation.navigate('Perfil');
            } else {
              alert("El email o contraseña son inválidos");
            }
          }
          catch (e) {
            console.log(e);
          } */
      
          
        
          
        
      }
      }
    
  return (
    
    <Formik initialValues={{
      email:'',
      contraseña:''
    }}
    >
      <SafeAreaView style={styles.container}>
      
        <View style={styles.centrar}> 
          <Image 
            source={Logo} style={styles.logo}
          />
        </View>

        <TextInput 
          style={styles.inputText1}
          onChangeText={setEmail}
          placeholder="Ingrese su mail..."
          value={email}
          name="email"
          keyboardType= "email-address"
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setContraseña}
          placeholder="Ingrese su contraseña..."
          value={contraseña}
          secureTextEntry={true}          
          name="contraseña"
        />

          <TouchableOpacity style={styles.boton} onPress={validarSesion}>
            <Text style={styles.letraRegistrarse}>Iniciar Sesion </Text>
          </TouchableOpacity>

        <Text>¿Todavia no tienes cuenta?</Text>

          <TouchableOpacity style={styles.boton2} onPress={() => navigation.navigate("Registrarse")}>
            <Text style={styles.letraRegistrarse}>Registrarse</Text>
          </TouchableOpacity>

          <StatusBar style={{color: '#F8F8EC'}} />
      </SafeAreaView>
    </Formik>
  )
}
export default IniciarSesion;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F8F8EC',
      justifyContent: 'center',
      paddingBottom:20,
      paddingTop:20,
  },
  centrar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160
  },
  logo:{
      alignItems: 'center',
      justifyContent: 'center',
      //textAlign:'center',
      position: 'absolute',
      //marginLeft: 100,
      width: 179,
      height: 179,
  },
  inputText1:{
    height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginTop: 140
  },
  inputText2:{
    height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
  boton: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#AEDD2B',
    paddingHorizontal: 1, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 20,
    //shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    textAlign:'center',
    //marginTop: 15,
  },
  boton2: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#066699',
    paddingHorizontal: 1, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 20,
    //shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    textAlign:'center',
    //marginTop: 15,
  },
  letraRegistrarse:{
    color: '#ffffff'
  },
  statusBar:{
    backgroundColor: '#F8F8EC'
  }
});
