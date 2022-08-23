import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import decryptWalletStd from "../functions/DecryptStd";
import getStore from "../store/storeSt";

const ImportScreen = () => {

    const storePassword = getStore();

    const navigation = useNavigation();

    const [_seedsInput, setSeedsInput] = React.useState("");

    const handleSeedsInputChange = (seedsInput) => {
        setSeedsInput(seedsInput);
    }



    const handleSeedsFromStore = async () => {
        const dec = await decryptWalletStd(storePassword.getState()["password"]);
        const seedsPhrase = dec._mnemonic().phrase;

        if (seedsPhrase === _seedsInput) {

            storePassword.dispatch({
                type: "setError",
                payload: ""
            });
            storePassword.dispatch({
                type: "setSession",
                payload: "open"
            });
            console.log(storePassword.getState());
            alert("wallet importeda");

            navigation.navigate('WalletView');
        }
        else {
            alert("frase no coincide");
            storePassword.dispatch({
                type: "setError",
                payload: "frase no coincide"
            });
            console.log(storePassword.getState());
        }
    }

    //iamge background
    const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};

    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={ styles.container }>

                <Text
                    style={ styles.title }
                >Importar Nueva Wallet</Text>
                <Text style={ styles.subTitle }>
                    Insertar Su Frase semilla</Text>

                <TextInput
                        placeholder="Escribir las 12 palabras"
                        style={[ styles.childStyle, styles.textInput, styles.textArea ]}
                        placeholderTextColor='grey'
                        onChangeText={handleSeedsInputChange}
                />

                <TouchableOpacity
                    onPress={() => {
                        handleSeedsFromStore()
                    }}
                    style={ styles.button }
                >
                    <Text
                        style={ styles.textButton }
                    >Confirmar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
const space = 5;
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
      fontSize: 30,
      color: '#09CA00',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '10%',
    },
    subTitle: {
        fontSize: 15,
        color: '#09CA00',
        fontWeight: 'bold',
    },
    button: {
        borderWidth: 1,
        backgroundColor: '#000000',
        padding: 10,
        marginTop: '10%',
        width: '50%',
        alignSelf: 'center',
        borderColor: 'green',
        borderRadius: 10,
        marginBottom: 30
    },
    textButton: {
        fontSize: 15,
        color: '#229954',
        textAlign: 'center',
        color: '#09CA00',
    },
    textInput: {
      color: '#09CA00',
      padding: 10,
      paddingStart: 30,
      borderWidth: 1,
      borderColor: '#09CA00',
      padding: 10,
      height: 50,
      marginTop: 20,
      borderRadius: 30,

      shadowColor: '#09CA00',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
      elevation: 1,
    },

    viewStyle: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: space,
        marginTop: 20,
        marginBottom: 20,

    },
    childStyle: {
        width: '50%',
        borderWidth: 1,
        marginBottom: space
    },
    textArea: {
        height: 100,
        width: '80%',
        borderWidth: 3,
        borderColor: 'green',
        backgroundColor: 'black',
        padding: 10,
        marginTop: 20,
        borderRadius: 30,

        shadowColor: '#c501e2',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        elevation: 1,
    }
  });

export default ImportScreen;