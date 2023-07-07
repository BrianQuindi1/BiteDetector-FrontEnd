import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import Boton from './Boton';

const BotonLog = () => {
  return (
    //<View >
        <TouchableOpacity style={styles.boton}>
            <Boton
            // style={styles.boton} 
                title='Registrarse' 
                color= '#AEDD2B'
                /*borderRadius= '15%'
                paddingHorizontal= '40' //cambia el tamaño del boton en forma horizontal
                paddingVertical= '5'*/
                />
        </TouchableOpacity>
    //</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*boton: {
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 5,
    margin: 80,
    shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    marginTop: 20,
    
    color: '#000000',
  },*/
  boton:{
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#AEDD2B',
    paddingHorizontal: 20, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 15,
    margin: 80,
    shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 10,
    textAlign:'center',
    marginTop: 20,
  },
  textoBoton: {
    color: '#000000',
    fontSize: 16,
    paddingHorizontal: 10, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 46,
    color: '#ffffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: "uppercase"
  }
});

export default BotonLog;