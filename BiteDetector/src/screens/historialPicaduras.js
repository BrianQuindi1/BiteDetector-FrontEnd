import React, {useEffect, useState} from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation,  } from '@react-navigation/native';
import axios from 'axios';
import CardHistorialPicaduras from '../components/CardHistorialPicaduras';
import API from '../API';

const HistorialPicaduras = () => {
  
  const navigation = useNavigation();
  const [historial, setHistorial] = useState([]);
  useEffect(() => {
  obtenerHistorial();    
  }, []);

  let url = API.ApiHistorial

  const obtenerHistorial = async ()=>{
   const historialAux= await axios.get(url);
   console.log("el historial es ");
   console.log(historialAux.data);   
   setHistorial(historialAux.data);
   console.log("el historial cuandos se setea historial: ");
   console.log(historial[0]);
  }
  return (
    <SafeAreaView>
       {historial.map((hist) => {
        <CardHistorialPicaduras picadura={hist}/>
      }) } 
      <CardHistorialPicaduras/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F8F8EC',
      justifyContent: 'center',
      paddingBottom:20,
      paddingTop:20,
  }
});

 
export default HistorialPicaduras;