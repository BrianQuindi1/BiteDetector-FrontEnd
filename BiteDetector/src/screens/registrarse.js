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
        <View style={styles.centrar}> 
          <Image 
            source={Logo} style={styles.logo}
          />
        </View>
        <TextInput 
          style={styles.inputText1}
          onchangeText={email}
          placeholder="Ingrese su mail..."
          value={email}
          name="email"
        />

        <TextInput 
          style={styles.inputText2}
          onchangeText={contraseña}
          placeholder="Ingrese su contraseña..."
          value={contraseña}
          name="contraseña"
        />

        <Button
          style={styles.boton} 
          title='Iniciar Sesion' 
          color= '#AEDD2B'
          />
      </SafeAreaView>
    </Formik>
  )
}

export default iniciarSesion

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
      textAlign:'center',
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
    textAlign:'center',
    marginTop: 200,
    borderRadius: 10
  }
});
