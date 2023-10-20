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
      let Usuario;
      if(contraseña === confirmarContraseña){
        Usuario = {
            Nombre: nombre,
            Mail: email,
            Password: contraseña
        }
      let url = API.ApiUsuario + "CrearUsuario";
      console.log(url);
      console.log(Usuario);
      const response = await axios.post( url, Usuario)
      .then(
        useEffect(() => {
          
          usuarioService.setObject("ObjetoUsuario", Usuario)
          .then(usuarioService.almacenarCredenciales(Usuario.Mail, Usuario.Password, Usuario.Nombre))
          .then(navigation.navigate("Perfil"));



         /*  const verificarInicioSesion = async () => { /* ver bien de modificar esta funcion y ver si no hay q ponerlo en setItem 
            try {
              // Comprobar si el usuario ha iniciado sesión en AsyncStorage
              //const jsonValue = JSON.stringify(Usuario);
              //const usuarioIniciadoSesion = await AsyncStorage.setItem('objetoUsuario', jsonValue); //ver bien que es y como hacer "usuarioiniciadosesion"
              const verificacion = false;
              AsyncUtils.setObject('objetoUsuario', Usuario);
              if(AsyncUtils.setObject('objetoUsuario', Usuario))
              {
                verificacion = true;
              }
              
      
              if (verificacion == true) {
                // El usuario ha iniciado sesión, redirigir a la vista de perfil
                navigation.navigate("Perfil"); // Ajusta el nombre de la pantalla de perfil según tu configuración de navegación
              }
            } catch (error) {
              console.error('Error al verificar el inicio de sesión:', error);
            }
          };
      
          verificarInicioSesion(); */
        }, [navigation])
      )
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
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setEmail}
          placeholder="Ingrese su mail..."
          value={email}
          name="email"
          keyboardType= "email-address"
          
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setContraseña}
          placeholder="Cree su contraseña segura..."
          value={contraseña}
          secureTextEntry={true}          
          name="contraseña"
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setConfirmarContraseña}
          placeholder="Confirme su contraseña..."
          value={confirmarContraseña}
          secureTextEntry={true}          
          name="confirmarContraseña"
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