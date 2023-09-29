import React, {useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView,} from "react-native";
import { Camera, CameraType, WhiteBalance } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Boton from "../components/Boton";
import Lupa from "../../assets/Lupa.png";
import API from "../API";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import ModalScanner from "../components/ModalScanner";
import RNPhotoManipulator from "react-native-photo-manipulator";
import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';
import base64 from 'react-native-base64'

const Scanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [foto, setFoto] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
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

/*   const variablesModal = async () => {
    try {
      let url = API.Ia;
      const response = await axios.get(url);
      const { Probabilidad, Estado, Picadura } = response.data; // Accede a los datos de la respuesta

      console.log(Probabilidad, Estado, Picadura);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }; */

  const takePicture = async () => {
    axios
    if (cameraRef) {
      try {
        const options = { quality: 0.5, skipProcessing: true/* , base64: true */};
        //const image = data.uri; 
        const data = await cameraRef.current.takePictureAsync( options);
        if (!data.uri) {
          throw new Error('Failed to capture an image.');
        }

        /*let messi = await ImageManipulator.manipulateAsync(data.uri, [
        {resize: {width: 1080, height: 720}},],
        {compress: 0.5, format: ImageManipulator.SaveFormat.PNG})
        messi = {base64: true}
        setImage(messi);*/
       /* let fotoEditada = await ImageResizer(data.uri, 500, 400);
       setImage(fotoEditada).then((result) => {
          console.log(result);
      });*/
         
        //let image = base64.encode(data.uri);
        /*await ImageResizer.manipulateAsync(data.uri, [
          {resize: {width: 700, height: 500, quality: 0, compress: 0.2}}
        ]);*/
        
        /* const image = data.uri;
        await ImageResizer.manipulateAsync(data.uri, [
          {resize: {width: 700, height: 500}}
        ]); */
        //const cropRegion = { x: 5, y: 30, height: 400, width: 250 };
        //const targetSize = { height: 200, width: 150 };

        /*RNPhotoManipulator.ActionCrop(image, cropRegion, targetSize).then((path) => {
          console.log(`Result image path: ${path}`);
          setImage(data.uri);
        });
       
    */
        console.log(data);
        
        //console.log("iamgen",image);
        
        //setImage(image);
        
        let url = API.ApiIa;

        /*const imageFile = await FileSystem.readAsStringAsync(data.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
*/
        const response = await axios.post(url, data);
        saveImage(image);

        console.log("Respuesta del backend:", response.data);
      } catch (e) {
        console.log(e);
        console.error("Error back", e);
      }
    }
  };
  
  /*const saveImage2 = async () => {
    if (image) {
      try {
        setShowModal(true); // Mostrar el componente ModalScanner
  
        await MediaLibrary.createAssetAsync(image);
        alert("¡Imagen guardada!")
        /*.then(<ModalScanner />)
        console.log(image);
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };*/

  const saveImage = async () => {
    if (image) {
      try {
        //const image = data.uri;
        
        showModal(true);
        <ModalScanner />
        await MediaLibrary.createAssetAsync(image);
        alert("Picture save!");
        console.log(image);
        setImage(null); 
      } catch (e) {
        console.log(e);
      }
    }
  };

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
            <Boton title={"Save"} icon="check" onPress={saveImage} />
           
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={takePicture} style={styles.botonScanner}>
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