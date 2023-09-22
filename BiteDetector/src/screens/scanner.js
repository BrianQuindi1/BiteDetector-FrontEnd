import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType, WhiteBalance } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Boton from "../components/Boton";
import Lupa from "../../assets/Lupa.png";
import API from "../API";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import ModalScanner from "../components/ModalScanner";
import RNPhotoManipulator from "react-native-photo-manipulator";

const Scanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [foto, setFoto] = useState("");
  //const [capturedImage, setCapturedImage] = useState(null);
  const [haveToRealod, setHaveToRealod] = useState(false);
  const [viewReady, setViewReady] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      setViewReady(false);
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      console.log("test");
      setViewReady(true);
    })();
  }, [haveToRealod]);

  if (!hasCameraPermission) {
    return <Text> No acces to camera</Text>;
  }

  const variablesModal = async () => {
    try {
      let url = API.Ia;
      const response = await axios.get(url);
      const { Probabilidad, Estado, Picadura } = response.data; // Accede a los datos de la respuesta

      console.log(Probabilidad, Estado, Picadura);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  const takePicture2 = async () =>{
    if (cameraRef){
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      }catch(e){
        console.log(e);
      }
    }
  }

  const takePicture = async () => {
    axios
    if (cameraRef) {
      try {
        const options = { quality: 1, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        if (!data.uri) {
            throw new Error('Failed to capture an image.');
          }
    
        console.log(data);
        const image = data.uri;
        console.log(image);
        /*const cropRegion = { x: 5, y: 30, height: 400, width: 250 };
        const targetSize = { height: 200, width: 150 };

        RNPhotoManipulator.ActionCrop(image, cropRegion, targetSize).then((path) => {
          console.log(`Result image path: ${path}`);
          setImage(data.uri);
        });*/
        setImage(image);
        
        let url = API.ApiIa;

        /*const imageFile = await FileSystem.readAsStringAsync(data.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });*/

        const response = await axios.post(url, image);
        saveImage();

        console.log("Respuesta del backend:", response.data);
      } catch (e) {
        console.log(e);
        console.error("Error back", e);
      }
    }
  };
  
  const saveImage2 = async () => {
    if (image) {
      try {
        setShowModal(true); // Mostrar el componente ModalScanner
  
        await MediaLibrary.createAssetAsync(image);
        alert("¡Imagen guardada!")
        /*.then(<ModalScanner />)*/
        console.log(image);
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        <ModalScanner />
        await MediaLibrary.createAssetAsync(image);
        alert("Picture save!");
        console.log(image);
        setImage(null);
/*
        <ModalScanner
          probabilidad={Probabilidad}
          estado={Estado}
          picadura={Picadura}
        />;*/
      } catch (e) {
        console.log(e);
      }
    }
  };

  /*
const handleTakePicture = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);

      // Enviar todo el objeto de la imagen al backend
      const response = await axios.post('URL_DEL_BACKEND', { photo });

      // Manejar la respuesta del backend aquí
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      // Manejar los errores aquí
      console.error('Error al tomar y enviar la imagen al backend:', error);
    }
  };


const imageSubmit = async () => {
    let objeto = {
        IdPicadura : IdPicadura,
        Foto: foto.uri,
        Estado: estado,
        IdInsecto: IdInsecto,
        Probabilidades : probabilidades
    };
    
    let url = API.ApiIa;
    console.log(url);
    console.log(objeto);
    const response = await axios.post( url, objeto)
    .then(alert("hola"))
    console.log("objeto de api" + objeto)
}*/

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
             <ModalScanner value={showModal}/>
            <Boton title={"Save"} icon="check" onPress={saveImage2} />
           
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={takePicture2} style={styles.botonScanner}>
              <Image source={Lupa} style={styles.lupa}></Image>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
