import React from "react"; // import React
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import getStore from "../store/storeSt"; // import store
import decryptWalletStd from "../functions/DecryptStd"; // import decryptWalletStd function

const SecretKeysScreen = () => {
    const storePassword = getStore();

    const navigation = useNavigation();

    const [_seeds, setSeeds] = React.useState("");

    const navigateToImportKeys = () => {
        navigation.navigate('Import');
        console.log(storePassword.getState());
        decryptWalletStd(storePassword.getState()["password"]);
    }

    const handleSeeds = async () => {
        const dec = await decryptWalletStd(storePassword.getState()["password"]);
        const seedsPhrase = dec._mnemonic().phrase;
        setSeeds(seedsPhrase);

    }

    const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};

    return (
        <ImageBackground source={image} style={styles.image}>
                <View style={ styles.container }>

                    <Text
                        style={ styles.title }
                    >Frase Semilla</Text>
                    <Text style={ styles.subTitle }>Copie Las 12 Palabras</Text>
                    <View style={styles.viewStyle}>

                        <Text
                            style={ styles.childStyle }
                        >{_seeds}
                        </Text>


                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            handleSeeds()
                        }
                        style={ styles.button }
                    >
                        <Text
                            style={ styles.textButton }
                        >Ver Frase Semilla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigateToImportKeys()
                            console.log(storePassword.getState());
                        }}
                        style={ styles.button }
                    >
                        <Text
                            style={ styles.textButton }
                        >Continuar</Text>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
    );
}
const space = 55;
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
    },
    button: {
        borderWidth: 1,
        backgroundColor: '#000000',
        padding: 10,
        marginTop: '10%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: 30,
        borderColor: '#229954',
        borderWidth: 2,
    },
    textButton: {
        fontSize: 15,
        textAlign: 'center',
        color: '#09CA00',
    },
    textInput: {
      color: '#09CA00',
      padding: 10,
      paddingStart: 30,
      borderWidth: 1,
      borderColor: 'Green',
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
        width: '80%',
        color: '#09CA00',
        marginBottom: space,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
        shadowColor: '#09CA00',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        elevation: 1,
    },
  });

export default SecretKeysScreen;