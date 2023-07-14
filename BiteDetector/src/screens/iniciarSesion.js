import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, TextInput, Button, Pressable, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png'
import axios from 'axios';
import API from '../API';

const iniciarSesion = () => {
  const [text, onchangeText] = React.useState('Useless text');
  const [number, onchangeNumber] = React.useState('');
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigation = useNavigation();


  
    let validarSesion = async () => {
      let objeto = {
        Mail: email,
        Contraseña: contraseña};
      const response = await axios.post(API.ApiUsuario + "IniciarSesion", objeto)
      .then(alert("Hola"));
    console.log(response.data);
    

    if (response.data.token)
    {
      //alert("Hola");
      //sesion valida --> mandarlo al perfil
    } 
    else
    {
      alert("El email o contraseña son invalidos")
    }
    
    }

  return (
    <Formik initialValues={{
      email:'',
      contraseña:''
    }}
    >
      <SafeAreaView>
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
        />

        <TextInput 
          style={styles.inputText2}
          onChangeText={setContraseña}
          placeholder="Ingrese su contraseña..."
          value={contraseña}
          secureTextEntry={true}          
          name="contraseña"
        />


       <Button
          style={styles.boton} 
          title="Iniciar Sesion" 
          color= '#AEDD2B'
          onPress={validarSesion()}
          />

       

        <Text>¿Todavia no tienes cuenta?</Text>
          <Button 
            style={styles.boton} 
            title="Registrarse" 
            color="#066699"
            onPress={() => navigation.navigate("Registrarse")}
          />

      </SafeAreaView>
    </Formik>
  )
}

export default iniciarSesion;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
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
    //backgroundColor: ''
    paddingHorizontal: 30, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 10,
    margin: 80,
    shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    textAlign:'center',
    marginTop: 200,
  }
});
