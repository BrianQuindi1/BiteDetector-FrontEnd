import { ActivityIndicator, useNavigator, StyleSheet, View, Image } from "react-native";
import React, { useEffect } from 'react'
//import UsuarioService from '../services/UsuarioService'
//import Logo from "../../assets/Logo_FutureSystems.jpg" 

const SplashScreen = ({navigation}) => {
  let usuarioService = new UsuarioService();

  const verificarInicioSesion = async() => {
    if(await usuarioService.automaticlogin()){
      navigation.navigate("Perfil");
    }else{
      navigation.navigate("Login");
    }
  }


  useEffect(()=> { 
    const onLoad = async () => { 
    //await new Promise(resolve => setTimeout(resolve,5000));
    verificarInicioSesion();
  };
   onLoad();

  }, []); 

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      <ActivityIndicator size="large" />
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: '75%',
    height: '40%',
    marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f48cc",
    padding: 20,
  },
});

export default SplashScreen;