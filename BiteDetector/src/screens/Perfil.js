import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, TextInput, Button, Pressable, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import PerfilLogo from '../../assets/iniciarSesion.png'
import API from '../API';
import AsyncUtils from './../AsyncUtils'

const Perfil = () => {
  const navigation = useNavigation();

  /*
  const jsonValue = await AsyncStorage.getItem('objetoUsuario');
  returnValue = ((jsonValue != null) ? JSON.parse(jsonValue) : null);
  const nombrecito = returnValue.Nombre
   */
  const miObjeto = AsyncUtils.getObject('objetoUsuario');
  


  return (
      <SafeAreaView>
        <View style={styles.acomodarFoto}> 
          <Image source={PerfilLogo} style={styles.logo}/>
        </View>

        <View style={styles.acomodarInformacion}>
            <Text>Nombre Usuario</Text>{/*DESPUES FIJARSE DE PONERLO CON LOS DATOS DEL USER*/}
            <Text>Email</Text>{/*DESPUES FIJARSE DE PONERLO CON LOS DATOS DEL USER*/}
            <Text>{miObjeto.Nombre}</Text>
        </View>
        
        <Button title='Cerrar Sesion' color="red"/> 

      </SafeAreaView>
    
  )
}

export default Perfil;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      paddingBottom:20,
      paddingTop:20,
  },
  acomodarFoto: {
    marginTop: 80,
    flex: 2
  },
  acomodarInformacion: {
    marginTop: 260,
    flex: 2
  },
  logo:{
      alignItems: 'center',
      justifyContent: 'center',
      //textAlign:'center',
      position: 'absolute',
      //marginLeft: 100,
      width: 129,
      height: 129,
  }
});
