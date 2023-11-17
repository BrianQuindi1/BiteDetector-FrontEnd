import { Formik } from 'formik';
import React from 'react'
import { StyleSheet, SafeAreaView, TextInput, Pressable, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormAgregarContacto = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState(null);

    const handleSubmit = async () => {
        let contactoEmergencia = {
            Nombre: nombre,
            Numero: numero,
        }
        let url = API.ApiContacto + "crearContacto";
        console.log(url);
        console.log(contactoEmergencia);
        const response = await axios.post( url, contactoEmergencia)
        console.log("Contacto1", contactoEmergencia);
        console.log(response.data);
        navigation.navigate("contactosDeEmergencia")
    }
  return (
    <Formik initialValues={{
        nombre:'',
        numero:''
      }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.centrar}> 
            <Image 
              source={Logo} style={styles.logo}
            />
          </View>
  
          <TextInput 
            style={styles.inputText1}
            onChangeText={setNombre}
            placeholder="Ingrese el nombre del contacto..."
            value={nombre}
            name="nombreUsuario"
            returnKeyType='next'
          />
  
          <TextInput 
            style={styles.inputText2}
            onChangeText={setNumero}
            placeholder="Ingrese el numero de telefono..."
            value={numero}
            name="number"
            keyboardType= "numeric"
            returnKeyType='next'          
          />
  
            <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
              <Text style={styles.letraBoton}>Confirmar</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </Formik>
  )
}

export default FormAgregarContacto

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#F8F8EC',
     // justifyContent: 'center',
      //alignItems: 'center',
      /*paddingBottom:20,
      paddingTop:20,*/
    },
    centrar: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 160
    },
    logo:{
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      //marginLeft: 100,
      width: 179,
      height: 179,
    },
    inputText1:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginTop: 140
    },
    inputText2:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    boton: {
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#066699',
      paddingHorizontal: 1, //cambia el tamaño del boton en forma horizontal
      paddingVertical: 20,
      //shadowRadius: 15,
      shadowColor: '#2C4521',
      shadowOpacity: 0.6,
      elevation: 5,
      textAlign:'center',
      //marginTop: 15,
    },
    letraBoton:{
      color: '#ffffff'
    },
  });