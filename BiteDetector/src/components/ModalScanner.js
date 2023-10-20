import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import axios from 'axios';

const ModalScanner = (picaduraRecibida) => {
 //A PICADURA LE LLEGA TODO EL OBJETO RECIBIDO
  console.log(picaduraRecibida)
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
            <Text style={styles.modalText}>Insecto: {picaduraRecibida.Nombre} </Text>
            <Text style={styles.modalText}>IdInsecto: {picaduraRecibida.IdInsecto} </Text>
            <Text style={styles.modalText}>Probabilidades:</Text>
            <Text style={styles.modalText2}>{picaduraRecibida.Probabilidades}</Text>
            

            <Text style={styles.modalText2}>_________</Text>

            <Text style={styles.modalText}>Posibles Riesgos:</Text> 
            <Text style={{color: 'green', fontSize: 20}}>Leves</Text> {/* harcodeado */}
            <Text style={styles.modalText2}>Picazón</Text>

            <Text style={styles.modalText2}>_________</Text>

            <Text style={styles.modalText}>Recomendaciones:</Text>
            <Text style={styles.modalText2}>{picaduraRecibida.Recomendaciones}</Text>

            <Text style={styles.modalText2}>_________</Text>

            <Text style={styles.modalText}>Estado: </Text>
            <Text style={styles.modalText2}>{picaduraRecibida.Estado}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
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
    height: 550,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText2: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalScanner;