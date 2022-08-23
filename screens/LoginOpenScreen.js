import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getStore from '../store/storeSt';

const LoginOpenScreen = () => {

  const storePassword = getStore();

  const [_password, setPassword] = React.useState("");

  const navigateToWallet = () => {
    navigation.navigate('WalletView');
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
  }

  const navigation = useNavigation();

  const checkPasswords = () => {
    if (_password === storePassword.getState()["password"]) {
      storePassword.dispatch({
        type: "setSession",
        payload: "open"
      });
      storePassword.dispatch({
        type: "setError",
        payload: ""
      });
      console.log(storePassword.getState());
      navigateToWallet();
      console.log(storePassword.getState());
    } else {
      alert("Contraseña incorrecta");
      storePassword.dispatch({
        type: "setError",
        payload: "Contraseña incorrecta"
      });
    }
  }

  const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};

  return (
    <ImageBackground source={image} style={styles.image}>
        <View style={ styles.container }>
          <Text style={ styles.title }>MyWallet</Text>
          <Text style={ styles.subTitle }>Bienvenido!!</Text>
          <TextInput
            secureTextEntry={true} //no se ve el texto
            placeholder="Contraseña"
            style={ styles.textInput }
            placeholderTextColor='grey'
            onChangeText={handlePasswordChange}
          />

        <TouchableOpacity
            onPress={() => {
              checkPasswords();
            }}
            style={ styles.button }
        >
            <Text
                style={ styles.textButton }
            >Login</Text>
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
    color: '#09ca00',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 30,
    color: '#09ca00',
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 1,
    backgroundColor: '#000000',
    padding: 10,
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 30
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#09ca00',
    fontWeight: 'bold',
  },
  textInput: {
    color: 'green',
    backgroundColor: '#000000',
    padding: 10,
    paddingStart: 30,
    borderWidth: 1,
    borderColor: '#09ca00',
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,

    shadowColor: '#09ca00',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 1,
  }
});

export default LoginOpenScreen;