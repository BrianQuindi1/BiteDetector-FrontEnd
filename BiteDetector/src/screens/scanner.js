import React, {useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import {Camera, CameraType, WhiteBalance} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Boton from '../components/Boton';
import Lupa from '../../assets/Lupa.png';
import API from '../API';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'



const Scanner =() => {
const [hasCameraPermission, setHasCameraPermission]= useState(null);
const [image, setImage]= useState(null);
const [type, setType]= useState(Camera.Constants.Type.back);
const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
const cameraRef = useRef(null);
const [estado, setEstado] = useState(null);
const [IdInsecto, setIdInsecto] = useState(null);
const [probabilidades, setProbabilidades] = useState(null);
const [IdPicadura, setIdPicadura] = useState(null);
const [foto, setFoto] = useState("");
const [capturedImage, setCapturedImage] = useState(null);
const [haveToRealod, setHaveToRealod] = useState(false);
const [viewReady, setViewReady] = useState(false);
 

useEffect(() =>{
    (async () =>{
    setViewReady(false)
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    
    console.log("test")
    setViewReady(true)

    }) ();
},[haveToRealod])

if(!hasCameraPermission)
{
    return <Text> No acces to camera</Text>
}

const takePicture = async () =>{
    axios
    if (cameraRef){
        try{
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
            let url = API.ApiIa;

            const imageFile = await FileSystem.readAsStringAsync(data.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const response = await axios.post(url, { image: imageFile });

            console.log('Respuesta del backend:', response.data);

        }catch(e){
            console.error('Error back', e);
        }
    }
}

/*const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        let url = API.ApiIa;
  
        const imageFile = await FileSystem.readAsStringAsync(data.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageFile }),
        });
  
          const responseData = await response.json();
          console.log('Respuesta del backend:', responseData);

      } catch (e) {

        setHaveToRealod(!haveToRealod)
        console.error('Error en la solicitud al backend', e);
      }
    }
  };*/
  

const saveImage= async () =>{
    if(image){
        try{
            await MediaLibrary.createAssetAsync(image);
            alert('Picture save!');
            console.log(image);
            setImage(null);
        }catch(e){
            console.log(e)
        }
    }
}

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
    <View style={styles.container}>
        {(!image && viewReady) ?
        <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
        >
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
        }}>
            <Boton icon={'retweet'} onPress={()=>
            setType(type===CameraType.back?CameraType.front:CameraType.back)
            }/>
            <Boton icon={'flash'} 
            color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
            onPress={() =>{
                setFlash(flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
                )
            }}/>
        </View>
        </Camera>
        :
        <Image source={{uri:image}} style={styles.camera}/>
        
        }
        <View>
            {image ? 
            <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between', 
            paddingHorizontal: 50
            }}>
            <Boton title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
            <Boton title={"Save"} icon="check" onPress={saveImage}/>
            </View>
            :
            <View style={styles.container}>
                <TouchableOpacity onPress={takePicture} style={styles.botonScanner}>
                    <Image source={Lupa} style={styles.lupa}></Image>
                </TouchableOpacity>
            </View>
            }

        </View>
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom:20,
        paddingTop:20,
    },
    camera:{
        flex:1,
        borderRadius:15,
    },
    lupa:{
        width: 79,
        height: 79,
    },
    botonScanner:{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        position: 'absolute',
        marginLeft: 159,
    }
    
});
