import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Button, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import PerfilLogo from "../../assets/iniciarSesion.png";
import API from "../API";
import AsyncUtils from "./../AsyncUtils";
import UsuarioService from "../services/UsuarioServices";
import axios from "axios";



const Perfil = () => {
  const [objetoUsuario, setObjetoUsuario] = useState({});
  const [loading, setLoading] = useState(true);

  const usuarioService = new UsuarioService();
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const usuario = await usuarioService.obtenerCredenciales();
        console.log("Usuario", usuario);

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
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosUsuario();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const cerrarSesion = async () => {
    const retryDelay = 2000; // Set the delay for retry in milliseconds
  
    const handleLogoutError = async (error, retries) => {
      console.error("Error during logout:", error);
  
      // Handle specific errors
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
  
        if (status === 502 || status === 503) {
          // Retry logic for 502 and 503 errors
          if (retries > 0) {
            console.log(`Retrying after a delay (${retryDelay}ms)...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            await cerrarSesion(retries - 1); // Retry the logout with reduced retries
          } else {
            console.log("Max retries reached. Unable to log out.");
            // You may want to handle the max retries case differently
          }
        } else {
          // Handle other status codes
        }
      } else {
        // Handle non-Axios errors
      }
    };
  
    try {
      await usuarioService.eliminarCredenciales();
      navigation.navigate("Iniciar Sesion");
    } catch (error) {
      await handleLogoutError(error, 3); // Set the number of retries (e.g., 3 retries)
    }
  };
  
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8EC' }}>
      <View style={styles.acomodarFoto}>
        <Image source={PerfilLogo} style={styles.logo} />
      </View>

      <View style={styles.acomodarInformacion}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text>Nombre Usuario: {objetoUsuario?.Nombre || ''}</Text>
            <Text>Email: {objetoUsuario?.Mail || ''}</Text>
          </>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160
  },
  acomodarInformacion: {
    marginTop: 260,
  },
  logo:{
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 179,
    height: 179,
  },
});
