import React, {useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import {Camera, CameraType, WhiteBalance} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Boton from '../components/Boton';
import Lupa from '../../assets/Lupa.png';
import API from '../API';

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


useEffect(() =>{
    (async () =>{
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    }) ();
},[])


if(hasCameraPermission === false)
{
    return <Text> No acces to camera</Text>
}

const takePicture = async () =>{
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
}
return (
    <View style={styles.container}>
        {!image ?
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
