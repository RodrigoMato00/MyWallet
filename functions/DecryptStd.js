import "react-native-get-random-values"
import  "@ethersproject/shims"
import { ethers } from "ethers";
import * as FileSystem from 'expo-file-system';

const decryptWalletStd = async (_password) => {
    const fileName = 'wallet.json';
    const filePath = FileSystem.documentDirectory + fileName;
    // read file
    const file = await FileSystem.readAsStringAsync(filePath);
    const json = await JSON.parse(file);
    const wallet = await ethers.Wallet.fromEncryptedJson(json, _password);
    return await wallet;
}

export default decryptWalletStd;