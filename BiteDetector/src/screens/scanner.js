import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Boton from "../components/Boton";
import Lupa from "../../assets/Lupa.png";
import API from "../API";
//import * as FileSystem from "expo-file-system";
import SplashScreen from "./SplashScreen";
import axios from "axios";
import ModalScanner from "../components/ModalScanner";

const Scanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  // const [foto, setFoto] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [haveToRealod, setHaveToRealod] = useState(false);
  const [viewReady, setViewReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [respuestaBack, setRespuestaBack] = useState(null);
  const URL = API.ApiHistorial + "Agregar";
  useEffect(() => {
    (async () => {
      setViewReady(false);
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      setViewReady(true);
    })();
  }, [haveToRealod]);

  if (!hasCameraPermission) {
    return <Text> No acces to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
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
            IdPicadura: response.data.IdPicadura,
            Estado: response.data.Estado,
            Probabilidad: response.data.Probabilidad,
            Nombre: response.data.Nombre,
            SintomasLeves: response.data.Recomendaciones.SintomasLeves,
            SintomasGraves: response.data.Recomendaciones.SintomasGraves,
            Recomendaciones: response.data.Recomendaciones.Recomendaciones,
            MasInfo: response.data.Recomendaciones.MasInfo,
          };
          console.log("picaduraRecibida");
          console.log(response.data);
          //console.log("B322b",response.data.picaduraRecibida)
          setRespuestaBack(picaduraRecibida);

          /* console.log("respuestaBack: ",respuestaBack) */
        });
        let perfil = AsyncUtils.getObject("PERFIL_KEY");
        if (perfil != null) {
          const response2 = await axios.post(URL, hist).then((response2) => {
            nuevoHist = {
              IdPicadura: picaduraRecibida.IdPicadura,
              IdUsuario: perfil.IdUsuario,
            };
          });
        }
          console.log(nuevoHist);
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
        //let respuesta = await respuestaPicadura();
        alert("Picture save!");
        /* console.log(image); */
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  /*  const respuestaPicadura = async () => {
    let picaduraRecibida; /* = {IdPicadura, Foto, Estado, IdInsecto, Probabilidades, Nombre, Recomendaciones}
    const url = API.ApiIa;
    console.log(url);
    await axios.get(url)
    .then(
      response => (
      picaduraRecibida = {
        IdPicadura      : response.data.IdPicadura,
        Foto            : response.data.Foto,
        Estado          : response.data.Estado,
        IdInsecto       : response.data.IdInsecto,
        Probabilidades  : response.data.Probabilidades,
        Nombre          : response.data.Nombre,
        Recomendaciones : response.data.Recomendaciones
        })
    ).then("response.data:",console.log(response.data))
    
    console.log(picaduraRecibida);
    return picaduraRecibida;
  } */

  return (
    <SafeAreaView style={styles.container}>
      {!image && viewReady ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Boton
              icon={"retweet"}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
            <Boton
              icon={"flash"}
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Boton
              title={"Re-take"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <Boton title={"Save"} icon="check" onPress={saveImage} />
            <ModalScanner value={showModal} respuestaBack={respuestaBack} />
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={takePicture} style={styles.botonScanner}>
              <Image source={Lupa} style={styles.lupa}></Image>
            </TouchableOpacity>
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
  }
});
