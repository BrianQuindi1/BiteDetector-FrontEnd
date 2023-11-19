import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Boton from "../components/Boton";
import Lupa from "../../assets/Lupa.png";
import API from "../API";
import SplashScreen from "./SplashScreen";
import axios from "axios";
import ModalScanner from "../components/ModalScanner";
import AsyncUtils from "../AsyncUtils";
const URL = API.ApiHistorial + "Agregar";

const Scanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [cameraKey, setCameraKey] = useState(0); // Increment this to refresh the camera
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [viewReady, setViewReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [respuestaBack, setRespuestaBack] = useState(null);

  useEffect(() => {
    (async () => {
      setViewReady(false);
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      setViewReady(true);
    })();
  }, []);

  useEffect(() => {
    // Update the camera key to force remount when entering the component
    setCameraKey((prevKey) => prevKey + 1);
  }, []);

  if (!hasCameraPermission || !viewReady) {
    return <Text>Camera is not ready.</Text>;
  }

  const takePicture = async () => {
    if (cameraRef && cameraRef.current) {
      try {
        const options = { skipProcessing: true, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        if (!data.uri) {
          throw new Error("Failed to capture an image.");
        }
        const objFoto = {
          Foto: data.base64,
        };
        let url = API.ApiIa;
        setImage(data.uri);
        const response = await axios.post(url, objFoto).then((response) => {
          picaduraRecibida = {
            IdPicadura: response.data.IdPicadura || 0,
            Estado: response.data.Estado,
            Probabilidad: response.data.Probabilidad,
            Nombre: response.data.Nombre,
            SintomasLeves: response.data.Recomendaciones.SintomasLeves,
            SintomasGraves: response.data.Recomendaciones.SintomasGraves,
            Recomendaciones: response.data.Recomendaciones?.Recomendaciones || "No recommendations",
            MasInfo: response.data.Recomendaciones?.MasInfo || "No additional information",
          };
          console.log("picaduraRecibida");
          console.log(response.data);
          setRespuestaBack(picaduraRecibida);
        });
        const perfil = AsyncUtils.getObject("PERFIL_KEY");

        if (perfil != null) {
          const nuevoHist = {
            IdPicadura: picaduraRecibida.IdPicadura,
            IdUsuario: perfil.IdUsuario,
          };

          const response2 = await axios.post(URL, nuevoHist);

          console.log("Nuevo Historial:", response2.data);
        }

        // Continue with the rest of your code
        saveImage(image);
      } catch (e) {
        console.log(e);
        console.error("Error back", e);
      }
    }
  };

  const saveImage = async (image) => {
    if (image) {
      try {
        console.log("HOLA");
        await MediaLibrary.createAssetAsync(image);
        alert("Picture save!");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {viewReady && (
        <Camera key={cameraKey} style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30 }}>
            <Boton icon={"retweet"} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
            <Boton
              icon={"flash"}
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      )}
      <View>
        {viewReady && (
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 50 }}>
            <Boton title={"Re-take"} icon="retweet" onPress={() => setImage(null)} />
            <Boton title={"Save"} icon="check" onPress={saveImage} />
            <ModalScanner value={showModal} respuestaBack={respuestaBack} />
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 15,
  },
  lupa: {
    width: 79,
    height: 79,
  },
  botonScanner: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    marginLeft: 159,
  },
});
