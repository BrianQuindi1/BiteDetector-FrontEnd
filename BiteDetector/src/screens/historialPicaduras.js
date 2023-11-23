import React, { useEffect, useState, useContext } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CardHistorialPicaduras from "../components/CardHistorialPicaduras";
import API from "../API";
import UsuarioService from "../services/UsuarioServices";
import { HistorialContext } from "../services/HistorialContext";

const HistorialPicaduras = () => {
  let usuarioService = new UsuarioService();
  const navigation = useNavigation();
  const [historial, setHistorial] = useState([]);
  const { actualizarHistorial } = useContext(HistorialContext);
  let url = API.ApiHistorial;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let perfil = await usuarioService.obtenerCredenciales();
        let id = perfil.IdUsuario;
        console.log(id);
        const historialAux = await axios.get(`${url}${id}`);
        console.log("el historial es ");
        console.log(historialAux.data);
        setHistorial(historialAux.data);

        console.log("cantidad:");
        console.log(historialAux.data.length);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
    return () => {
      //
    };
  }, [actualizarHistorial]);

  return (

    <ScrollView>
      <SafeAreaView style={styles.container}>
        {historial.map((hist) => (
          <CardHistorialPicaduras key={hist.id} picadura={hist} />
        ))}
        <CardHistorialPicaduras />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8EC",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  ScrollView: {
    marginHorizontal: 20,
  },
});

export default HistorialPicaduras;
