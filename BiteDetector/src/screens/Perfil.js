import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Button, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import PerfilLogo from "../../assets/iniciarSesion.png";
import API from "../API";
import AsyncUtils from "./../AsyncUtils";
import UsuarioService from "../services/UsuarioServices";
import axios from "axios";



const Perfil = async () => {
  const [Nombre, setNombre] = useState(null);
  const [Mail, setMail] = useState(null);
  const [IdUsuario, setIdUsuario] = useState(null);
  const [objetoUsuario, setObjetoUsuario] = useState({});

  let usuarioService = new UsuarioService();
  const navigation = useNavigation();
    
      let usuario = await usuarioService.obtenerCredenciales();
      console.log(usuario);
      try {
        if (usuario) {
          const usuarioData = {
            IdUsuario: usuario.IdUsuario,
            Mail: usuario.Mail,
            Nombre: usuario.Nombre,
          };
          

          setObjetoUsuario(usuarioData);
          
        } else {
          console.log("No se encontraron datos del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    
      console.log("usuarioData",objetoUsuario.Nombre);
  const cerrarSesion = async () => {
    await usuarioService.eliminarCredenciales();
    navigation.navigate("Iniciar Sesion");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8EC' }}>
      <View style={styles.acomodarFoto}>
        <Image source={PerfilLogo} style={styles.logo} />
      </View>

      <View style={styles.acomodarInformacion}>
  <Text>Nombre Usuario: {objetoUsuario?.Nombre || ''}</Text>
  <Text>Email: {objetoUsuario?.Mail || ''}</Text>
</View>

      <Button title="Cerrar Sesion" color="red" onPress={cerrarSesion} />
    </SafeAreaView>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  acomodarFoto: {
    marginTop: 80,
    flex: 2,
  },
  acomodarInformacion: {
    marginTop: 260,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 129,
    height: 129,
  },
});
