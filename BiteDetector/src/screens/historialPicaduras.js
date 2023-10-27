import React, {useEffect} from 'react'
import { Text, SafeAreaView,  } from 'react-native';
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
   setHistorial(historialAux);
  }
  return (
    <SafeAreaView>
      {historial.map((hist) => {

      }) }
      <CardHistorialPicaduras/>
    </SafeAreaView>
  )
}
 
export default HistorialPicaduras