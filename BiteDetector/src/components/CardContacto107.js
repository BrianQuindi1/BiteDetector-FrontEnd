import React from 'react'
import { View, Text, StyleSheet, Image, Linking, Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import ambulancia from '../../assets/ambulancia.png'


function CardContacto107() {
  const llamarNumero = () => {
    const phoneNumber = 107;
    Linking.openURL(`tel:${phoneNumber}`)
  }
    return (
        <SafeAreaView style={styles.card}>
          <View style={styles.cardContent}>
          <Text style={styles.title}>Ambulancia</Text>
          <Pressable onPress={() => llamarNumero()} style={styles.boton}>
              <Text>Llamar al 107</Text>
            </Pressable> 
          </View>
        </SafeAreaView>
      );
    };

    const styles = StyleSheet.create({
      card: {
        backgroundColor: 'red',
        borderRadius: 15,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        marginBottom: 600          
      },
        boton: {
          alignItems: 'center',
          borderRadius: 15,
          backgroundColor: '#F8F8EC',
          paddingHorizontal: 1, //cambia el tamaño del boton en forma horizontal
          paddingVertical: 10,
          //shadowRadius: 15,
          shadowColor: '#2C4521',
          shadowOpacity: 0.6,
          elevation: 5,
          textAlign:'center',
          //marginTop: 15,
        },
      cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center'
      },
        image: {
          width: '30%',
          height: 'auto',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        description: {
          marginTop: 8,
          fontSize: 14,
          color: '#666',
        },
      });
      

export default CardContacto107;