import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import axios from 'axios';

const ModalScanner = ( {respuestaBack} ) => {
  //A PICADURA LE LLEGA TODO EL OBJETO RECIBIDO  
  console.log("respuestaPicadura", respuestaBack)
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nombre: </Text>
            <Text style={styles.modalText3}>{respuestaBack?.Nombre}</Text>

            <Text style={styles.modalText}>Probabilidades:</Text>
            <Text style={styles.modalText2}>{respuestaBack?.Probabilidad}</Text>

            <Text style={styles.modalText2}>__________________</Text>

            <Text style={styles.modalText}>Posibles Riesgos:</Text>
{/*             <Text style={{ color: 'green', fontSize: 16  }}>Leves</Text> */}
            <Text style={styles.modalText2}>{respuestaBack?.SintomasLeves}</Text>

            <Text style={styles.modalText2}>__________________</Text>

            <Text style={styles.modalText}>Recomendaciones: </Text>
            <Text style={styles.modalText2}>{respuestaBack?.Recomendaciones}</Text>

            <Text style={styles.modalText2}>{/* {respuestaPicadura.picaduraRecibida.Recomendaciones} */}</Text>

            <Text style={styles.modalText2}>__________________</Text>

            <Text style={styles.modalText}>Estado: </Text>
            <Text style={styles.modalText3}>{respuestaBack?.Estado}</Text>

            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    height: 600,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    /* shadowOffset: {
      width: 0,
      height: 2,
    }, */
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  modalText2: {
    fontSize: 11,
    textAlign: 'center',
  },
  modalText3: {
    fontSize: 13,
    textAlign: 'center',
  },
});

export default ModalScanner;