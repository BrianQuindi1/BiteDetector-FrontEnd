import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text, View, Image } from 'react-native';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png';
import API from '../API';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import UsuarioService from '../services/UsuarioServices';

const Registrarse = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [contraseña, setContraseña] = useState("");

  let usuarioService = new UsuarioService();

  const handleSubmit = async () => {
    try {
      let Usuario = {};

      if (contraseña === confirmarContraseña) {
        Usuario = {
          Nombre: nombre,
          Mail: email,
          Password: contraseña,
        };

        let url = API.ApiUsuario + "crearUsuario";
        const response = await axios.post(url, Usuario);
      
        if (response.data) {
        
          navigation.navigate('Iniciar Sesion');
        }
      } else {
        alert("Las contraseñas no son iguales, por favor confirme de nuevo la contraseña.");
      }
    } catch (error) {
      console.error("Error handling submit:", error.message);
    }
  };

  return (
    <Formik initialValues={{
      email: '',
      contraseña: '',
      nombre: '',
      confirmarContraseña: ''
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
          keyboardType="email-address"
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
  );
};

export default Registrarse;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8EC',
  },
  centrar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 179,
    height: 179,
  },
  inputText1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 140,
  },
  inputText2: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  boton: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#066699',
    paddingHorizontal: 1,
    paddingVertical: 20,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    textAlign: 'center',
  },
  letraBoton: {
    color: '#ffffff',
  },
});
