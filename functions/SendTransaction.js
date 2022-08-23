import "react-native-get-random-values"
import  "@ethersproject/shims"
import { ethers } from "ethers";

const sendTransaction = async (amo, to, pk, pro) => {
  
    const too = to;
    const privateKey = pk;
    const amount = amo;
    const providerName = pro;
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

export default sendTransaction;