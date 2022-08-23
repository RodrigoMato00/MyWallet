import "react-native-get-random-values"
import  "@ethersproject/shims"
import { ethers } from "ethers";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const SettingsScreen = () => {



  const [_address, setAddress] = useState('');
  const [_provider, setProvider] = useState('');
  const [_privateKey, setPrivateKey] = useState('');
  const [_amount, setAmount] = useState('');
  const [_password, setPassword] = useState('');
  const [_mnemonic, setMnemonic] = useState('');

  const handleChangeAddress = (text) => {
    setAddress(text);
  }

  const handleChangeProvider = (text) => {
    setProvider(text);
  }

  const handleChangePrivateKey = (text) => {
    setPrivateKey(text);
  }

  const handleChangeAmount = (text) => {
    setAmount(text);
  }

  const handlePassword = (text) => {
    setPassword(text);
  }

  const handleMnemonic = (text) => {
    setMnemonic(text);
  }

  const fromMnemonic = async () => {
    const mnemonic = _mnemonic;

    console.log(mnemonic);

    const wallet = await ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);

    console.log('MNEMONIC ADDRESS: ' + wallet.address);
    console.log('MNEMONIC PRIVATE KEY: ' + wallet.privateKey);
  }



  const newWallet = async () => {
    const wallet = await ethers.Wallet.createRandom();
    const password = _password

    console.log('PRIVATE KEY: ' + wallet.privateKey);
    console.log('ADDRESS: ' + wallet.address);
    console.log('MNEMONIC: ' + wallet._mnemonic().phrase);


    let encryptPromise = await wallet.encrypt(password);

    await AsyncStorage.setItem('wallet', encryptPromise);
    const json = encryptPromise;
    const fileName = 'wallet.json';
    const filePath = FileSystem.documentDirectory + fileName;
    const newObj = [];
    newObj.push(json);
    const newJSON = JSON.stringify(newObj);
    await FileSystem.writeAsStringAsync(filePath, newJSON);
    console.log('------- PATH --------');
    console.log(filePath);
    console.log('------- JSON CREATED --------');

    FileSystem.readAsStringAsync(filePath).then(data => {
      console.log('------- JSON READ');
      console.log(JSON.parse(data));
    }
    );

    console.log('NEW WALLET')

}

const moreWallet = async () => {
  const wallet = await ethers.Wallet.createRandom();
  const password = _password;

  let encryptPromise = await wallet.encrypt(password);

  await AsyncStorage.setItem('wallet', encryptPromise);
  //console.log(encryptPromise);
  //console.log('>>>>> NEW WALLET <<<<<')

  const filePath = FileSystem.documentDirectory + 'wallet.json';
  FileSystem.readAsStringAsync(filePath).then(async (json) => {
    const newObj = JSON.parse(json);
    newObj.push(encryptPromise);
    const newJSON = JSON.stringify(newObj);
    await FileSystem.writeAsStringAsync(filePath, newJSON);
    console.log('PATH ');
    console.log(filePath);
    console.log('JSON CREATED');
  }
  ).catch(err => {
    console.log(err);
  }
  );

  FileSystem.readAsStringAsync(filePath).then(data => {
    console.log('JSON READ');
    console.log(JSON.parse(data));
  }
  );
}

//fromEncryptedJson

// DECRYPT ALL WALLETS IN JSON FILE
const decryptAllWallets = async () => {
  console.log(_password);
  const filePath = FileSystem.documentDirectory + 'wallet.json';
  FileSystem.readAsStringAsync(filePath).then(async (json) => {
    /*const newObj = JSON.parse(json);
    for (let i = 0; i < newObj.length; i++) {
      console.log(newObj[i]);
      console.log('ADRESS: ' + newObj[i].address);
      const wallet = await ethers.Wallet.fromEncryptedJson(newObj[i], _password);
      console.log(wallet);
    }*/
    const newObj = JSON.parse(json);
    for (let i = 0; i < newObj.length; i++) {
      const wallet = await ethers.Wallet.fromEncryptedJson(newObj[i], _password);
      console.log('PRIVATE KEY DECRYPTED: ' + wallet.privateKey);
      console.log('ADDRESS DECRYPTED: ' + wallet.address);
      console.log('MNEMONIC DECRYPTED: ' + wallet._mnemonic().phrase);
      console.log(wallet);
    }
  }
  ).catch(err => {
    console.log(err);
  }
  );
}

const getBalance = async () => {
  const address = _address;
  const providerName = _provider;
  const providerLower = providerName.toLowerCase();
  const provider = ethers.getDefaultProvider(providerLower);
  const balance = await provider.getBalance(address);
  const response = {
    balance: balance,
    address: address,
    provider: providerName,
  }
  const balanceJson = JSON.stringify(response);
  await AsyncStorage.setItem('balance', balanceJson);
  const balanceDecimal = parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
  console.log(balanceDecimal);
}

const getHistory = async () => {
  const address = _address;
  const providerName = _provider;
  const providerLower = providerName.toLowerCase();
  let etherscanProvider = new ethers.providers.EtherscanProvider(providerLower);
  etherscanProvider.getHistory(address).then((history) => {
    const historyJson = JSON.stringify(history);
    console.log(historyJson);
    AsyncStorage.setItem('history', historyJson);
  }
  ).catch((error) => {
    console.log(error);
  }
  );
}

const sendTransaction = async () => {
  const too = '';
  const privateKey = '';
  const amount = '';
  const providerName = '';
  const providerLower = providerName.toLowerCase();

  const provider = ethers.getDefaultProvider(providerLower);
  const wallet = new ethers.Wallet(privateKey, provider);
  const amountWei = ethers.utils.parseEther(amount);

  const transaction = {
    to: too,
    value: amountWei,
  };

  let sendPromise = wallet.sendTransaction(transaction);
  sendPromise.then((transaction) => {
    console.log(transaction);
  }
  ).catch((error) => {
    console.log(error);
  }
  );
}

const handlePressNewWallet = async () => {
  await newWallet();
  const wallet = await AsyncStorage.getItem('wallet');
  const address = JSON.parse(wallet).address;
  alert(address);
}

const handlePressMoreWallet = async () => {
  await moreWallet();
  const wallet = await AsyncStorage.getItem('wallet');
  const address = JSON.parse(wallet).address;
  alert(address);
}

const handlePressBalance = async () => {
  await getBalance();
  const balance = await AsyncStorage.getItem('balance');
  const balanceJson = JSON.parse(balance);
  console.log(balanceJson);
  const balanceDecimal = ethers.utils.formatEther(balanceJson.balance.hex);
  alert(balanceDecimal);
}

const handlePressHistory = async () => {
  await getHistory();
  const history = await AsyncStorage.getItem('history');
  const historyJson = JSON.parse(history);
  console.log(historyJson);
  alert(historyJson);
}

const handlePressSendTransaction = async () => {
  await sendTransaction();
  alert('Transaction sent');
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Herraminietas de prueba</Text>
      <StatusBar style="auto" />

      <TextInput
        placeholderTextColor='grey'
        onChangeText={handlePassword}
      />

      <TouchableOpacity
        onPress={handlePressNewWallet}
        style={ styles.button }
        >
          <Text
            style={ styles.textButton }
          >Nueva Wallet </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressMoreWallet}
        style={ styles.button }
        >
          <Text
            style={ styles.textButton }
          >Generar Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={decryptAllWallets}
        style={ styles.button }
        >
          <Text
            style={ styles.textButton }
          >Desencriptar</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Direccion de la wallet"
        placeholderTextColor='grey'
        onChangeText={handleChangeAddress}
      />
      <TextInput
        placeholder="red (ethereum, ropsten, rinkeby, kovan)"
        placeholderTextColor='grey'
        onChangeText={handleChangeProvider}
      />

      <TouchableOpacity
        onPress={handlePressBalance}
        style={[ styles.button, styles.buttonB ]}
        >
          <Text
            style={ styles.textButton }
          >Balance</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressHistory}
        style={[ styles.button, styles.buttonH ]}
        >
          <Text
            style={ styles.textButton }
          >Historial de transacciones</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Private Key"
        placeholderTextColor='grey'
        onChangeText={handleChangePrivateKey}
      />
      <TextInput
        keyboardType="number-pad"
        placeholder="monto a enviar"
        placeholderTextColor='grey'
        onChangeText={handleChangeAmount}
      />
      <TouchableOpacity
        onPress={handlePressSendTransaction}
        style={[ styles.button, styles.buttonT ]}
        >
          <Text
            style={ styles.textButton }
          >Transferir</Text>
      </TouchableOpacity>

      <TextInput
        placeholderTextColor='grey'
        onChangeText={handleMnemonic}
      />
      <TouchableOpacity
        onPress={fromMnemonic}
        style={[ styles.button, styles.buttonT ]}
        >
          <Text
            style={ styles.textButton }
          > Importar desde semilla</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#07fad6',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonB: {
    backgroundColor: '#07fa10'
  },
  buttonH: {
    backgroundColor: '#07fa10'
  },
  buttonT: {
    backgroundColor: '#6ba1ed'
  }
});

export default SettingsScreen;