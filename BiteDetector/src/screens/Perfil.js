import React from "react";
import {StyleSheet,SafeAreaView,Button,Text,View,Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import PerfilLogo from "../../assets/iniciarSesion.png";
import API from "../API";
import AsyncUtils from "./../AsyncUtils";
import UsuarioService from "../services/UsuarioServices";
import axios from "axios";


let usuarioService = new UsuarioService();

const Perfil = async () => {
  const [Nombre, setNombre] = useState(null);
  const [Mail, setMail] = useState(null);
  const [IdUsuario, setIdUsuario] = useState(null);

  const navigation = useNavigation();

  const URL = API.ApiUsuario + "login";
let objetoUsuario;

try {
  const response = await axios.get(URL);
  objetoUsuario = {
    IdUsuario: response.data.IdUsuario,
    Mail: response.data.Mail,
    Nombre: response.data.Nombre,
  };
  console.log(response.data);
  AsyncUtils.setObject("PERFIL_KEY", objetoUsuario);
} catch (error) {
  console.error("Error al obtener los datos del usuario:", error);
}

  const cerrarSesion = async () => {
    await usuarioService.eliminarCredenciales();
    navigation.navigate("Iniciar Sesion");
  };

  return (
    <SafeAreaView>
      <View style={styles.acomodarFoto}>
        <Image source={PerfilLogo} style={styles.logo} />
      </View>

      <View style={styles.acomodarInformacion}>
        <Text /* style={styles.acomodarInformacion} */>
          {" "}
          Nombre Usuario: {response.data.objetoUsuario.Nombre}
        </Text>
        <Text>Email: {response.data.objetoUsuario.Mail}</Text>
        {/*DESPUES FIJARSE DE PONERLO CON LOS DATOS DEL USER*/}
      </View>

      <Button title="Cerrar Sesion" color="red" onPress={() => cerrarSesion} />
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
    //textAlign:'center',
    position: "absolute",
    //marginLeft: 100,
    width: 129,
    height: 129,
  },
});
