import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import newWalletImport from '../functions/CreateNewWalletImport';
import getStore from '../store/storeSt';

const LoginImportScreen = () => {

  const storePassword = getStore();

  const [_password, setPassword] = React.useState("");
  const [_repeatPassword, setRepeatPassword] = React.useState("");
  const [_mnemonic, setMnemonic] = React.useState("");


  const handleMnemonic = (text) => {
    setMnemonic(text);
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
  }

  const handleRepeatPasswordChange = (repeatPassword) => {
    setRepeatPassword(repeatPassword);
  }

  const navigation = useNavigation();

  const navigateToWallet = () => {
    navigation.navigate('WalletView');
  }

  const checkPasswords = () => {
    if (_password === _repeatPassword) {
      storePassword.dispatch({
        type: "changePassword",
        payload: _password
      });
      storePassword.dispatch({
        type: "setAppState",
        payload: "active"
      });
      storePassword.dispatch({
        type: "setError",
        payload: ""
      });
      const storeP = storePassword.getState()["password"];
      newWalletImport(storeP, _mnemonic);
      navigateToWallet();
      console.log(storePassword.getState());
    } else {
      alert("Contraseñas no coinciden");
      storePassword.dispatch({
        type: "setError",
        payload: "Contraseñas no coinciden"
      });
    }
  }

  //iamge background
  const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};


  return (

    <ImageBackground source={image} style={styles.image}>
      <View style={ styles.container }>
        <Text style={ styles.title }>MyWallet</Text>
        <Text style={ styles.subTitle }>Importar Cuenta</Text>
        <TextInput
          placeholder="Escriba su frase semilla"
          style={[ styles.childStyle, styles.textInput, styles.textArea ]}
            placeholderTextColor='green'
            multiline={true}
            onChangeText={handleMnemonic}
        />
        <TextInput
          secureTextEntry={true} //no se ve el texto
          placeholder="Nueva contraseña"
          style={ styles.textInput }
          placeholderTextColor='green'
          onChangeText={handlePasswordChange}
        />
        <TextInput
        secureTextEntry={true} //no se ve el texto
          placeholder="Repetir contraseña"h
          style={ styles.textInput }
          placeholderTextColor='green'
          onChangeText={handleRepeatPasswordChange}
        />

      <TouchableOpacity
          onPress={() => {
            checkPasswords();
          }}
          style={ styles.button }
      >
          <Text
              style={ styles.textButton }
          >Importar Wallet</Text>
      </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    color: '#09ca00',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    color: '#09Ca00',
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 1,
    backgroundColor: '#000000',
    padding: 10,
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: 30
  },
  textButton: {
    fontSize: 15,
    textAlign: 'center',
    color: 'green',
  },
  textInput: {
    color: 'green',
    padding: 10,
    paddingStart: 30,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: '#000000',
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,

    shadowColor: '#c501e2',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 1,
  }
});

export default LoginImportScreen;