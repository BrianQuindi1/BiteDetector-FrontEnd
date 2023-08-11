import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';


const CardHistorialPicaduras = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Insecto</Text>
        <Text style={styles.description}>Probablilidades segun tensorflow</Text>
        <Text style={styles.description}>Fecha</Text>
        <Button title='Ver Foto' color='#F8F8EC'></Button>
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
});

export default CardHistorialPicaduras;


