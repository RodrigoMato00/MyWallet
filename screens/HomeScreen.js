import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import getStore from "../store/storeSt";

const HomeScreen = () => {

    const navigation = useNavigation();

    const storePassword = getStore();

    storePassword.dispatch({
        type: "setDeleteAddress",
        payload: ""


    });

    //iamge background
    const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};

    return (
        <ImageBackground source={image} style={styles.image}>
            <View>

                <Text
                    style={ styles.title }
                >MyWallet</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginImport')}
                    style={ styles.button }
                >
                    <Text
                        style={ styles.textButton }
                    >Importar Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        storePassword.dispatch({
                            type: "setAppState",
                            payload: "active"
                        });
                        console.log(storePassword.getState());
                        navigation.navigate('Login')
                    }}

                    style={ styles.button }
                >
                    <Text
                        style={ styles.textButton }
                    >Crear Nueva Wallet</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
      },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    title: {
      fontSize: 60,
      color: '#09CA00',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
        borderWidth: 1,
        backgroundColor: '#000000',
        padding: 10,
        marginTop: '20%',
        width: '50%',
        alignSelf: 'center',
        borderColor: 'green',
        borderRadius: 10,

    },
    textButton: {
        fontSize: 15,
        textAlign: 'center',
        color: '#229954',
        fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 15,
      color: '#22995',
    },
    textInput: {
      color: 'white',
      padding: 10,
      paddingStart: 30,
      borderWidth: 1,
      borderColor: '#229954',
      padding: 10,
      width: '80%',
      height: 50,
      marginTop: 20,
      borderRadius: 30,

      // Shadow
      shadowColor: '#c501e2',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
      elevation: 1,
    }
  });

export default HomeScreen;