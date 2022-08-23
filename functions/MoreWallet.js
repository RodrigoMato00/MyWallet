import "react-native-get-random-values"
import  "@ethersproject/shims"
import { ethers } from "ethers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import getStore from '../store/storeSt';

const moreWallet = async (_password) => {

    const storePassword = getStore();

    const wallet = await ethers.Wallet.createRandom();

    storePassword.dispatch({type: 'setAddress', payload: wallet.address});
    const password = _password;

    let encryptPromise = await wallet.encrypt(password);

    await AsyncStorage.setItem('wallet', encryptPromise);

    const filePath = FileSystem.documentDirectory + 'wallet.json';
    FileSystem.readAsStringAsync(filePath).then(async (json) => {
      const newObj = JSON.parse(json);
      newObj.push(encryptPromise);
      const newJSON = JSON.stringify(newObj);
      await FileSystem.writeAsStringAsync(filePath, newJSON);
    }
    ).catch(err => {
      console.log(err);
    }
    );

    FileSystem.readAsStringAsync(filePath).then(data => {
    }
    );
  }

export default moreWallet;