import "react-native-get-random-values"
import  "@ethersproject/shims"
import { ethers } from "ethers";

const getBalance = async (_address, _provider) => {
    const address = _address;
    const providerName = _provider;
    const providerLower = providerName.toLowerCase();
    const provider = ethers.getDefaultProvider(providerLower);
    const balance = await provider.getBalance(address);
    const balanceDecimal = parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
    return balanceDecimal;
}

export default getBalance;