import React, {text} from 'react'
import { StyleSheet, SafeAreaView, TextInput, Button, email, contraseña, Pressable, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Formik, formik } from 'formik';
import Logo from '../../assets/Logo.png'

const iniciarSesion = () => {
  const [text, onchangeText] = React.useState('Useless text');
  const [number, onchangeNumber] = React.useState('');
  return (
    <Formik initialValues={{
      email:'',
      contraseña:''
    }}
    >
      <SafeAreaView>
        <Text>iniciarSesion</Text>
        <TextInput 
          
          onchangeText={email}
          placeholder="Ingrese su mail..."
          value={email}
          name="email"
        />

        <TextInput 
          
          onchangeText={contraseña}
          placeholder="Ingrese su contraseña..."
          value={contraseña}
          name="contraseña"
        />
        <Button title='Iniciar Sesion' />
      </SafeAreaView>
    </Formik>
  )
}

export default iniciarSesion

const styles = StyleSheet.create({
  container: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
  },
  logo:{
      alignItems: 'center',
      justifyContent: 'center',
      textAlign:'center',
      position: 'absolute',
      //marginLeft: 159,
      width: 179,
      height: 179,
  },
});
