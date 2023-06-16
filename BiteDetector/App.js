import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
//import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import {Camera, CameraType, WhiteBalance} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Boton from './src/components/Boton';
import Lupa from './assets/Lupa.png'
import contactosDeEmergencia from './screen'
import historialPicaduras from './screen'
import iniciarSesion from './screen'
/*import contactosDeEmergencia from './assets/contactosDeEmergencia.png'
import historialPicaduras from './assets/historialPicaduras.png'
import iniciarSesion from './assets/iniciarSesion.png'
import menu from './assets/menu.png'*/
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";


export default function App() {
  const [hasCameraPermission, setHasCameraPermission]= useState(null);
  const [image, setImage]= useState(null);
  const [type, setType]= useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const Drawer = createDrawerNavigator();

  useEffect(() =>{
    (async () =>{
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    }) ();
  },[])

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
        alert('Picture save!')
        setImage(null);
      }catch(e){
        console.log(e)
      }
    }
  }

 if(hasCameraPermission === false){
  return <Text> No acces to camera</Text>
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
          <TouchableOpacity onPress={takePicture}>
            <Image source={Lupa} style={styles.lupa}></Image>
          </TouchableOpacity>
        </View>
        }

        
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={
              (props) => {
                return (
                  <SafeAreaView>
                    <View
                      style={{
                        height: 200,
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomColor: "#f4f4f4",
                        borderBottomWidth: 1
                      }}
                    >
                      <Image
                        source={User}
                        style={{
                          height: 130,
                          width: 130,
                          borderRadius: 65
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 22,
                          marginVertical: 6,
                          fontWeight: "bold",
                          color: "#111"
                        }}
                      >Nombre</Text>
                    </View>
                    <DrawerItemList {...props} />
                  </SafeAreaView>
                )
              }
            }
            screenOptions={{
              drawerStyle: {
                backgroundColor: "#fff",
                width: 250
              },
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold"
              },
              drawerLabelStyle: {
                color: "#111"
              }
            }}
          >
            <Drawer.Screen
              name="Contactos de Emergencia"
              options={{
                drawerLabel: "Contactos de Emergencia",
                title: "Contactos de Emergencia",
                drawerIcon: () => (
                  <MaterialIcons name="PermContactCalendar" size={20} color="#808080" />
                )
              }}
              component={contactosDeEmergencia}
            />
            <Drawer.Screen
              name="Historial de Picaduras"
              options={{
                drawerLabel: "Historial de Picaduras",
                title: "Historial de Picaduras",
                drawerIcon: () => (
                  <MaterialIcons name="History" size={20} color="#808080" />
                )
              }}
              component={historialPicaduras}
            />
            <Drawer.Screen
              name="Iniciar Sesion"
              options={{
                drawerLabel: "Iniciar Sesion",
                title: "Iniciar Sesion",
                drawerIcon: () => (
                  <MaterialIcons name="Login" size={20} color="#808080" />
                )
              }}
              component={iniciarSesion}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    position: 'absolute',
    width: 79,
    height: 79,
    marginLeft: 159,
    marginBottom: 500,
  }

});
