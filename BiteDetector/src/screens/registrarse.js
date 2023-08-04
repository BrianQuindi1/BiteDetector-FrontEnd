import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, TextInput, Button, Pressable, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png'
import BotonLog from '../components/BotonLog';
import axios from 'axios';
import API from '../API';

const Registrarse = () => {
  const [text, onchangeText] = React.useState('Useless text');
  //const [number, onchangeNumber] = React.useState('');
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [contraseña, setContraseña] = useState("");
  //const [items, setItems] = useState([]);
  

  /*useEffect(() => {
    (async() => {
      axios.get(API.ApiUsuario)
      .then(response => {
        setItems(responde.data.map(usuario => ({label: usuario.nombreUsuario, label: usuario.email, label: usuario.contraseña,value:usuario.id})))
      })
      .catch(error => {
        console.log(error);
      });
    });
  }, [])
*/

  const handleSubmit = async () => {
      let objeto;
      if(contraseña === confirmarContraseña){
         objeto = {
          Nombre: nombre,
          Mail: email,
          Contraseña: contraseña
      }
      let url = API.ApiUsuario + "CrearUsuario";
      console.log(url);
      console.log(objeto);
      const response = await axios.post( url, objeto)
      .then(alert("hola"))
      }
      
      else
      {
        alert("Las contraseñas no son iguales, por favor confirme de nuevo la contraseña.")
      }
     
      
      console.log(objeto);


      
      console.log(response.data);
   
  }



  return (
    <Formik initialValues={{
      email:'',
      contraseña:'',
      nombreUsuario:'',
      confirmarContraseña:''
      
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
        <TouchableOpacity>

          {/*<BotonLog>*/}
          <Button onPress={handleSubmit} title="Confirmar" >  </Button>

        </TouchableOpacity>
        {/*<View style={styles.container}>
          <TouchableOpacity style={styles.boton}>
            <Text style={styles.textoBoton}>Registrarse</Text>
          </TouchableOpacity>
</View>*/}
      </SafeAreaView>
    </Formik>
  )
}

export default Registrarse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 10, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 5,
    margin: 80,
    shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    marginTop: 20,
  },
 /* boton: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#AEDD2B',
    paddingHorizontal: 60, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 25,
    margin: 80,
    /*shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 10,
    textAlign:'center',
    marginTop: 200,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }*/
});