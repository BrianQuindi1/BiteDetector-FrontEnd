import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ModalHistorial from "./ModalHistorial.js"


const CardHistorialPicaduras = ({ picadura }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(picadura);
  const { Nombre, Probabilidades, Foto, Recomendaciones } = picadura || {};
  console.log("la picadura que le llega a la card:");

  const mostrarModal = async () => {
    console.log('Before showing modal:', showModal);
    await setShowModal(true);
    console.log('After showing modal:', showModal);
  };
  return (

    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{Nombre}</Text>
        <Text style={styles.description}>Probablilidades: {Probabilidades}%</Text>
        {/* <Button title='Ver Foto' color='#F8F8EC' onPress={() => mostrarModal} ></Button> */}
        <TouchableOpacity style={styles.boton2} onPress={() => mostrarModal()}>
          <Text>Ver Foto</Text>
        </TouchableOpacity>
        {showModal ? (
      <>
      <ModalHistorial value={showModal} foto={Foto} setShowModal={setShowModal}/>
      </>
      ): (
        <></>
      )}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#AEDD2B',
    borderRadius: 15,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  boton2: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#066699',
    paddingHorizontal: 1, //cambia el tamaño del boton en forma horizontal
    paddingVertical: 20,
    //shadowRadius: 15,
    shadowColor: '#2C4521',
    shadowOpacity: 0.6,
    elevation: 5,
    textAlign: 'center',
    //marginTop: 15,
  }
});

export default CardHistorialPicaduras;


