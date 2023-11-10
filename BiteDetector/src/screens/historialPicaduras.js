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
    const obtenerHistorial = async ()=>{
      const historialAux= await axios.get(`${url}/1`);//en donde esta el 1 debería ir el id del usuario
      console.log("el historial es ");
      console.log(historialAux.data);   
      setHistorial(historialAux.data);
      
      console.log('cantidad:');
      console.log(historialAux.data.length);
     }

    obtenerHistorial();    
      return()=>{ 
          //
      };
  }, []);

  let url = API.ApiHistorial

  
  return (
    <SafeAreaView style={styles.container}>
      
       {historial.map((hist) => (
        <CardHistorialPicaduras picadura={hist}/>
        
      )) } 
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