import React from 'react'
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import ambulancia from '../../assets/ambulancia.png'


function CardContacto107() {
    return (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Ambulancia</Text>
            <Image source={ambulancia}></Image> {/* acomodar la imagen */}
            <Button title='Llamar' color='#F8F8EC'></Button>
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
      

export default CardContacto107