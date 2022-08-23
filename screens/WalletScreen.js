import "react-native-get-random-values"
import  "@ethersproject/shims"
import { ethers } from "ethers";
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import getBalance from "../functions/GetBalance";
import moreWallet from "../functions/MoreWallet";
import sendTransaction from "../functions/SendTransaction";
import importNewWallet from "../functions/ImportNewWallet";
import { StyleSheet, Text, View, TextInput,TouchableOpacity,
          Modal, Pressable, Alert, ImageBackground, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getStore from '../store/storeSt';
import SelectList from 'react-native-dropdown-select-list'



const WalletScreen = () => {

  const storePassword = getStore();

  const arrAddressInit = storePassword.getState().address[0];

  const [_selectedNetwork, setSelectedNetwork] = React.useState("Ropsten");
  const [_selectedAddress, setSelectedAddress] = React.useState(arrAddressInit);

  const [_walletSelected, setWalletSelected] = React.useState({});

  const [modalVisibleImport, setModalVisibleImport] = useState(false);
  const [importText , setImportText] = useState("");
  const [importPass , setImportPass] = useState("");

  const [_amount, setAmount] = React.useState("");
  const [_to, setTo] = React.useState('');

  const [modalVisiblePK, setModalVisiblePK] = useState(false);
  const [modalVisibleMN, setModalVisibleMN] = useState(false);
  const [_seeds, setSeeds] = React.useState("");
  const [_history, setHistory] = useState(null);

  //useEfect
useEffect(() => {
  if (_history != null) {
    alert('Historial' + '\n' + _history)
    setHistory(null)
  }
}, [_history]);


  const getWalletDecryptAllWallets = async () => {
    //getWalletDecryptAllWallets desencripta el archivo wallet.json y devuelve el wallet seleccionado
    const storeP = storePassword.getState()["password"];
    const filePath = FileSystem.documentDirectory + 'wallet.json';
    FileSystem.readAsStringAsync(filePath).then(async (json) => {
      const newObj = JSON.parse(json);
      for (let i = 0; i < newObj.length; i++) {
        await ethers.Wallet.fromEncryptedJson(newObj[i], storeP).then(async (wallet) => {
          if (wallet.address === _selectedAddress) {
            setWalletSelected(wallet);
            return wallet;
          }
        }
        );
      }
    }

    );
  }

  const getHistory = async () => {
    //getHistory devuelve el historial de transacciones de la wallet seleccionada
    const address = _selectedAddress;
    const network = _selectedNetwork;
    const providerLower = _selectedNetwork.toLowerCase();
    let etherscanProvider = await new ethers.providers.EtherscanProvider(providerLower);
    etherscanProvider.getHistory(address).then(async (history) => {
      const historyJson = JSON.stringify(history);
      console.log(historyJson);
      await AsyncStorage.setItem('history', historyJson);
      console.log('HISTORY SAVED');
      const historyArray = [];
      for (let i = 0; i < history.length; i++) {
        const historyObj = {
          hash: history[i].hash,
          timestamp: history[i].timestamp,
          Emisor: history[i].from,
          Receptor: history[i].to,
          Monto: history[i].value / 1000000000000000000,
          Fecha: Date(history[i].timestamp * 1000).toLocaleDateString(),
          Hora: Date(history[i].timestamp * 1000).toLocaleTimeString(),
          }
        historyArray.push(historyObj);
      }
    //console.log(historyArray);
    const historyArrayJson = JSON.stringify(historyArray);
    //console.log('yyyyyooooo'  + historyArrayJson);
    AsyncStorage.setItem('historyArray', historyArrayJson);
    //console.log('hhhhhhhhhhhoooooollllllllaaaaaaa' + AsyncStorage.getItem('historyArray'));
    const historyArrayString = historyArrayJson.replace(/[{}]/g, '').replace(/[\[\]]/g, '').replace(/,/g, '\n').replace(/value/g, '\nvalue\n').replace(/Date/g, '\nDate\n').replace(/Time/g, '\nTime\n');
    //charge the historyArrayString to a _history variable
    setHistory(historyArrayString);
    //console.log('ACA ESTOY_________________ \n' + _history);


  }
  ).catch((error) => {
    console.log(error);

  }

  );

}

const handlePressHistory = async () => {
  //handlePressHistory llama a getHistory y muestra el historial de transacciones
  await getHistory().then(() => {
    console.log('history: ' + _history);
  });

}

  console.log(_selectedNetwork);
  console.log(_selectedAddress);

  const [_balance, setBalance] = React.useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  console.log('BALANCE: ' + _balance);


  const getAddress = () => {
    //getAddress devuelve la address de la wallet seleccionada
    const arrAddress = storePassword.getState().address;
    return arrAddress.map((address) => {
      const value = `${address.substring(0, 4)}...${address.substr(address.length - 3)}`;
      return ({
        key: address,
        value: value,
      });
    });
  }

  const dataDropdown = [
    { value: 'Ethereum' },
    { value: 'Goerli' },
    { value: 'Kovan' },
    { value: 'Rinkeby' },
    { value: 'Ropsten' },
  ];

  const handleSelectedNetworkChange = (selectedNetwork) => {
    //handleSelectedNetworkChange guarda la network seleccionada en el state
    setSelectedNetwork(selectedNetwork);
  }

  const handleSelectedAddressChange = (selectedAddress) => {
    //handleSelectedAddressChange guarda la address seleccionada en el state
    setSelectedAddress(selectedAddress);
  }

  const handleBalanceChange = async () => {
    //handleBalanceChange devuelve el balance de la wallet seleccionada
    const balance = await getBalance(_selectedAddress, _selectedNetwork);
    setBalance(balance);
    console.log('BALANCEhand: ' + balance);
  }

  const handlePressMoreWallet = async () => {
    //handlePressMoreWallet llama a getWallets y muestra las wallets guardadas
    await moreWallet(storePassword.getState()["password"]);
    const wallet = await AsyncStorage.getItem('wallet');
    const address = JSON.parse(wallet).address;
    console.log(storePassword.getState());
    getAddress();
    alert(address);
  }

  const handleWalletSelected = async () => {
    //handleWalletSelected guarda la wallet seleccionada en el state
    const wallet = await getWalletDecryptAllWallets();
  }

  const handleSeeds = async () => {
    //handleSeeds devuelve las seeds de la wallet seleccionada
    const dec = _walletSelected;
    const seedsPhrase = dec._mnemonic().phrase;
    setSeeds(seedsPhrase);

}

  const handleSendTransaction = async () => {
    //handleSendTransaction envia una transaccion a la wallet seleccionada
    await sendTransaction(_amount, _to, _walletSelected.privateKey, _selectedNetwork);
    //console.log('SEND TRANSACTION');
  }

  const handleAmountSend = (amount) => {
    setAmount(amount);
  }

  const handleToSend = (to) => {
    setTo(to);
  }

  const handleToImportText = (text) => {
    setImportText(text);
  }

  const handleToImportPass = (text) => {
    setImportPass(text);
  }

  const handleImport = async () => {
    await importNewWallet(importText, storePassword.getState()["password"]);
  }


  const navigation = useNavigation();


  console.log("------- FIN LoginScreen ---------");

  //iamge background
  const image = {uri: "https://i.pinimg.com/originals/16/02/b2/1602b26c05ee78120695d592a68b8912.gif"};


  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={ styles.container }>
        <SelectList
          data={dataDropdown}
          setSelected={setSelectedNetwork}
          selected={_selectedNetwork}
          placeholder="Seleccionar Red"
          boxStyles={styles.boxStyles}
          dropdownStyles={styles.dropdownStyles}
          dropdownItemStyles={styles.dropdownItemStyle}


          onChange={() => {
            handleSelectedNetworkChange(_selectedNetwork);
            console.log(_selectedNetwork);
          }}

        />
        <SelectList
          data={getAddress()}
          setSelected={setSelectedAddress}
          selected={_selectedAddress}
          placeholder="Seleccionar Wallet"
          boxStyles={styles.boxStyles}
          dropdownStyles={styles.dropdownStyles}
          dropdownItemStyles={styles.dropdownItemStyle}

          onSelect={() => {
            setSelectedAddress(_selectedAddress);
            getWalletDecryptAllWallets().then((wallet) => {
            //console.log('AHORA LA WALLET ESTA: ' + _walletSelected.address);
            //console.log('WALLET SELECTED: ' + _walletSelected.address);
            //console.log('WALLET SELECTED: ' + _walletSelected.privateKey);
            });
          }}
        />
        <Text style={ styles.firstBalance }>{_balance}
          <Text style={ styles.symbol }>ETH</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            handleWalletSelected();
            setModalVisible(true);
          }}
          style={[ styles.button, styles.primaryButton ]}
      >
          <Text
              style={ styles.textButton }

          >TRASNFERIR</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {
            handleBalanceChange();
          }}
          style={[ styles.button, styles.secondaryButton ]}
      >
          <Text
              style={[ styles.textButton, { color: '#229954'} ]}

          >BALANCE</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => {
            handleBalanceChange();
            setModalVisibleImport(true);
          }}
          style={[ styles.button, styles.secondaryButton ]}
      >
          <Text
              style={[ styles.textButton, { color: '#229954'} ]}

          >IMPORTAR WALLET</Text>
      </TouchableOpacity>


      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around"}}>
        <TouchableOpacity
            onPress={() => {
              handlePressMoreWallet();
            }}
            style={[ styles.roundedButton, styles.button ]}
        >
            <Text
                style={[ styles.textButton, { color: '#229954'} ]}

            >New Wallet</Text>
      </TouchableOpacity>


          <TouchableOpacity
              onPress={() => {
                setModalVisiblePK(true);
              }}
              style={[ styles.roundedButton, styles.button ]}
          >
              <Text
                  style={[ styles.textButton, { color: '#229954'} ]}
              >Private Key</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              setModalVisibleMN(true);
            }}
            style={[ styles.roundedButton, styles.button ]}
        >
            <Text
                style={[ styles.textButton, { color: '#229954'} ]}
            >Seeds</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
          onPress={handlePressHistory}
          style={[ styles.button, styles.secondaryButton ]}
          >
            <Text
              style={ styles.textButton }
            >HISTORIAL</Text>
        </TouchableOpacity>


          <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-around"}}>

          <TouchableOpacity
              onPress={() => {
                storePassword.dispatch({
                  type: 'setSession',
                  payload: 'closed',
                });
                console.log(storePassword.getState());
                navigation.navigate('LoginOpen');
              }}
              style={[ styles.roundedButton, styles.button ]}
          >
              <Text
                  style={[ styles.textButton, { color: '#229954'} ]}
              >SALIR</Text>
          </TouchableOpacity>
        <TouchableOpacity
              onPress={() => {
                storePassword.dispatch({
                  type: 'setSession',
                  payload: 'closed',
                });
                storePassword.dispatch({
                  type: 'setPassword',
                  payload: '',
                });
                storePassword.dispatch({
                  type: 'setAppState',
                  payload: 'inactive',
                });
                storePassword.dispatch({
                  type: 'setDeleteAddress',
                  payload: '',
                });

                console.log(storePassword.getState());
                navigation.navigate('HomeScreen');
              }}
            style={[ styles.roundedButton, styles.button ]}
        >
            <Text
                style={[ styles.textButton, { color: '#229954'} ]}
            >ELIMINAR</Text>
        </TouchableOpacity>

      </View>


      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enviar Transaccion</Text>

              <TextInput
                      placeholder="0.00"
                      placeholderTextColor='grey'
                      fontSize={50}
                      onChangeText={handleAmountSend}
              />
              <Text style={styles.modalText}>ETH</Text>
              <TextInput
                      placeholder="Enviar a"
                      placeholderTextColor='grey'
                      onChangeText={handleToSend}
              />
              <Pressable
                style={[styles.button1, styles.buttonClose]}
                onPress={() => {
                  handleSendTransaction();
                  setModalVisible(!modalVisible);
                  console.log('WALLET SELECTED: ' + _walletSelected.address);}
                }>
                <Text style={styles.textStyle}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleImport}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleImport(!modalVisibleImport);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Escribe tu Private key</Text>

              <TextInput
                      style={styles.text1}
                      placeholder="0x0123..."
                      placeholderTextColor='grey'
                      onChangeText={handleToImportText}
                      placeholderBackgroundColor='grey'
              />
              <Pressable
                style={[styles.button1, styles.buttonClose]}
                onPress={() => {
                  //handleSendTransaction();
                  handleImport();
                  setModalVisibleImport(!modalVisibleImport);
                  console.log('WALLET SELECTED: ' + _walletSelected.address);}
                }>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>



        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisiblePK}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisiblePK(!modalVisiblePK);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Introduce Tu ContraseñaR</Text>

              <TextInput
                      placeholder="Contraseña"
                      placeholderTextColor='grey'
                      onChangeText={handleToImportPass}
              />
              <Pressable
                style={[styles.button1, styles.buttonClose]}
                onPress={() => {
                  //handleSendTransaction();
                  //handleImport();
                  setModalVisiblePK(!modalVisiblePK);
                  if (importPass === storePassword.getState()["password"]) {
                    alert('_walletSelected.address: ' + _walletSelected.address +
                    '\n_walletSelected.privateKey: ' + _walletSelected.privateKey);
                  } else {
                    alert('Contraseña incorrecta');
                  }
                  setImportPass(null);
                  console.log('WALLET SELECTED: ' + _walletSelected.address);}
                }>
                <Text style={styles.textStyle}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleMN}
          onRequestClose={() => {
            Alert.alert('Modal ha sido cerrado.');
            setModalVisibleMN(!modalVisibleMN);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Introduzca Su Contraseña </Text>

              <TextInput
                      style={styles.text1}
                      placeholder="Contraseña"
                      placeholderTextColor='green'
                      onChangeText={handleToImportPass}
              />
              <Pressable
                style={[styles.button1, styles.buttonClose]}
                onPress={() => {
                  //handleSendTransaction();
                  //handleImport();
                  setModalVisibleMN(!modalVisibleMN);
                  if (importPass === storePassword.getState()["Contraseña"]) {
                    if (!_walletSelected._mnemonic()) {
                      alert('Frase Semilla no encontrada');
                    } else {
                      alert('_walletSelected._mnemonic: ' + _walletSelected._mnemonic().phrase);
                    }
                    setImportPass(null);
                  } else {
                    alert('Contraseña incorrecta');
                  }
                  console.log('WALLET SELECTED: ' + _walletSelected.address);}
                }>
                <Text style={styles.textStyle}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    paddingVertical: 30,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  address: {
    fontSize: 10,
    color: '#229954',
    fontWeight: 'bold',
    marginTop: 10,
  },
  firstBalance: {
    fontSize: 65,
    color: '#229954',
    fontWeight: 'bold',
    marginTop: 10,
  },
  symbol: {
    fontSize: 20,
    color: '#229954',
    fontWeight: 'bold',
  },
  button: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  primaryButton: {
    backgroundColor: '#000000',
    width: '50%',
    alignSelf: 'center',
    borderColor: 'green',
  },
  textButton: {
    fontSize: 15,
    textAlign: 'center',
    color: '#229954',
  },
  secondaryButton: {
    width: "50%",
    borderWidth: 1,
    borderColor: 'green',
    color: '#229954',
  },
  roundedButton: {
    width: 100,
    borderColor: '#229954',
  },
  textInput: {
    color: 'green',
    padding: 10,
    paddingStart: 30,
    borderWidth: 1,
    borderColor: '#229954',
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,

    shadowColor: '#229954',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 1,
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#229954',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'black',
    marginTop: '10%',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#229954',
  },
  buttonClose: {
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#229954',
  },
  textStyle: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'green',
    marginBottom: 15,
    textAlign: 'center',
  },

  boxStyles: {
    borderWidth: 0,
    backgroundColor: 'green',
    position: "relative",
    borderRadius: 10,
  },
  dropdownStyles: {
    color: 'green',
    backgroundColor: '#07fad6',
    width: "100%",
    borderWidth: 0,
    marginTop: 10,
    top: -20,
    borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropdownItemStyle: {
    alignItems: 'center',
    textAlign: 'center',
    width: "100%"
  },
  text1: {
    color: 'green',
    backgroundColor: 'black',

  },

});

export default WalletScreen;