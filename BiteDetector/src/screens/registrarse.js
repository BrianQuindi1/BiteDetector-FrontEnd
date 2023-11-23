import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, TextInput, Pressable, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png'
import API from '../API';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Perfil from '../screens/Perfil.js'
import axios from 'axios'
import AsyncUtils from './../AsyncUtils'
import { useNavigation } from '@react-navigation/native';
import UsuarioService from '../services/UsuarioServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

//impoortar perfil

const Registrarse = () => {
  const navigation = useNavigation();
 // const [text, onchangeText] = React.useState('Useless text');
  //const [number, onchangeNumber] = React.useState('');
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [contraseña, setContraseña] = useState("");
  //const [items, setItems] = useState([]);
  


  let usuarioService = new UsuarioService(); 
 
 const handleSubmit = async () => {
      let Usuario = {};
      if(contraseña === confirmarContraseña){
        Usuario = {
            Nombre: nombre,
            Mail: email,
            Password: contraseña
        }
      let url = API.ApiUsuario + "crearUsuario";
      console.log(url);
      const response = await axios.post( url, Usuario)
      console.log("response:", response.data)
      try {
        if(response.data)
        {
          await AsyncStorage.setItem('usuarioRegistrado', 'true');
          await AsyncStorage.setItem('token', response.data.Token);
          await usuarioService.almacenarCredenciales(response.data);
          AsyncStorage.setObject("usuarioRegistrado", response.data)
          navigation.navigate('Perfil');
        }
        
       // await usuarioService.almacenarCredenciales(Usuario);
        //usuarioService.almacenarCredenciales(Usuario.Mail, Usuario.Password, Usuario.Nombre)
       // await AsyncStorage.setItem('usuarioIniciadoSesion', 'true')
        //await usuarioService.almacenarCredenciales(Usuario);
      } catch (e) {
        console.log(e);
      }
    }
      else
      {
        alert("Las contraseñas no son iguales, por favor confirme de nuevo la contraseña.")
      }
     
      
      console.log(Usuario);


      
      console.log(response.data);
   
  }



  return (
    <Formik initialValues={{
      email:'',
      contraseña:'',
      nombre:'',
      confirmarContraseña:''
      
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
          onChangeText={setNombre}
          placeholder="Ingrese su nombre de usuario..."
          value={nombre}
          name="nombreUsuario"
          returnKeyType='next'
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setEmail}
          placeholder="Ingrese su mail..."
          value={email}
          name="email"
          keyboardType= "email-address"
          returnKeyType='next'          
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setContraseña}
          placeholder="Cree su contraseña segura..."
          value={contraseña}
          secureTextEntry={true}          
          name="contraseña"
          returnKeyType='next'
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setConfirmarContraseña}
          placeholder="Confirme su contraseña..."
          value={confirmarContraseña}
          secureTextEntry={true}          
          name="confirmarContraseña"
          returnKeyType='done'
        />

          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.letraBoton}>Confirmar </Text>
          </TouchableOpacity>
      </SafeAreaView>
    </Formik>
  )
}

export default Registrarse;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#F8F8EC',
   // justifyContent: 'center',
    //alignItems: 'center',
    /*paddingBottom:20,
    paddingTop:20,*/
  },
  centrar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160
  },
  logo:{
    alignItems: 'center',
    justifyContent: 'center',
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
  letraBoton:{
    color: '#ffffff'
  },
});