import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import newWallet from '../functions/CreateNewWallet';
import getStore from '../store/storeSt';

const LoginScreen = () => {

  const storePassword = getStore();

  const [_password, setPassword] = React.useState("");
  const [_repeatPassword, setRepeatPassword] = React.useState("");

  const handlePasswordChange = (password) => {
    setPassword(password);
  }

  const handleRepeatPasswordChange = (repeatPassword) => {
    setRepeatPassword(repeatPassword);
  }

  const navigation = useNavigation();

  const navigateToSecretKeys = () => {
    navigation.navigate('SecretKeys');
  }

  const checkPasswords = () => {
    if (_password === _repeatPassword) {
      storePassword.dispatch({
        type: "changePassword",
        payload: _password
      });
      storePassword.dispatch({
        type: "setError",
        payload: ""
      });
      const storeP = storePassword.getState()["password"];
      newWallet(storeP);
      navigateToSecretKeys();
      console.log(storePassword.getState());
    } else {
      alert("Contraseñas no coinciden");
      storePassword.dispatch({
        type: "setError",
        payload: "Contraseñas no coinciden"
      });
    }
  }

  const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={ styles.container }>
        <Text style={ styles.title }>MyWallet</Text>
        <Text style={ styles.subTitle }>Crear Nueva Contrseña</Text>
        <TextInput
          placeholder="Nueva Contraseña"
          style={ styles.textInput }
          placeholderTextColor='grey'
          onChangeText={handlePasswordChange}
        />
        <TextInput
          placeholder="Repetir Contraseña"
          style={ styles.textInput }
          placeholderTextColor='grey'
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
          >Crear Wallet</Text>
      </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
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

  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#09CA00',
  },
  button: {
    borderWidth: 1,
    backgroundColor: '#000000',
    padding: 10,
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 30,
    borderColor: '#229954',
    borderWidth: 2,
  },
  textButton: {
    fontSize: 15,
    textAlign: 'center',
    color: '#229954',
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
    borderRadius: 10,
    backgroundColor: '#000000',
    borderWidth: 2,

    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 1,
  }
});

export default LoginScreen;