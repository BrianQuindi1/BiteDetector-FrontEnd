import { Formik } from 'formik';
import React from 'react'
import { StyleSheet, SafeAreaView, TextInput, Pressable, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormAgregarContacto = () => {
    const navigation = useNavigation();
 // const [text, onchangeText] = React.useState('Useless text');
  //const [number, onchangeNumber] = React.useState('');
    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState(null);

    const handleSubmit = async () => {
        let contactoEmergencia = {
            Nombre: nombre,
            Numero: numero,
        }
        let url = API.ApiContacto + "crearContacto";
        console.log(url);
        console.log(Usuario);
        const response = await axios.post( url, contactoEmergencia)
        
  /*      .then(
            usuarioService.setObject("UsuarioIniciadoSesion", Usuario)
            .then(usuarioService.almacenarCredenciales(Usuario.Mail, Usuario.Password, Usuario.Nombre))
            .then(navigation.navigate("Perfil"))
            ) */

        alert("Las contraseñas no son iguales, por favor confirme de nuevo la contraseña.")
        console.log("Contacto1", contactoEmergencia);
        console.log(response.data);
    }
  return (
    <Formik initialValues={{
        nombre:'',
        numero:''
      }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.centrar}> 
            <Image 
              source={Logo} style={styles.logo}
            />
          </View>
  
          <TextInput 
            style={styles.inputText1}
            onChangeText={setNombre}
            placeholder="Ingrese su nombre de usuario..."
            value={nombre}
            name="nombreUsuario"
            returnKeyType='next'
          />
  
          <TextInput 
            style={styles.inputText2}
            onChangeText={setNumero}
            placeholder="Ingrese su mail..."
            value={numero}
            name="number"
            keyboardType= "numeric"
            returnKeyType='next'          
          />
  
            <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
              <Text style={styles.letraBoton}>Confirmar </Text>
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