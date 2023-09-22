import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ModalScanner = (/*{ probabilidad, estado, picadura }*/) => {
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
            <Text style={styles.modalText}>Insecto:</Text>
            <Text style={styles.modalText2}>Mosquito: 97%</Text>
            <Text style={styles.modalText2}>Abeja: 2,7%</Text>

            <Text style={styles.modalText2}>_________</Text>

            <Text style={styles.modalText}>Posibles Riesgos:</Text>
            <Text style={{color: 'green', fontSize: 10}}>Leves</Text>
            <Text style={styles.modalText2}>Picazón</Text>

            <Text style={styles.modalText2}>_________</Text>

            <Text style={styles.modalText}>Recomendaciones:</Text>
            <Text style={styles.modalText2}>Aplicar caladril</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide</Text>
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 250,
    height: 450,
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
  /*buttonOpen: {
    backgroundColor: '#F194FF',
  },*/
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText2: {
    fontSize: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalScanner;