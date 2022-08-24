# MyWallet

## DISEÑO DE LA APP

![APP](https://github.com/RodrigoMato00/MyWallet/blob/master/Docs/Disen%CC%83o_front.png)

## ARQUITECTURA DE LA APP
![APP](https://github.com/RodrigoMato00/MyWallet/blob/master/Docs/Arquitectura.png)

## Funciones

### Transferir:

Esta suncion desencripta la wallet seleccionada, accede a la clave privada para realizar la transacción. Se debe seleccionar el proveedor para conectar la wallet a la red por donde se operara, se definira el monto y  se ingresara la clave publica a la que se hara la transferencia transferir.

Para hacer la transaccion se utiliza ethers.wallet.sendTransaction(transaction).
Esta funcion firma automaticamente la transaccion.

### Balance 

Utiliza la clave pública seleccionada y el proveedor,para esto se utiliza la función provider.getBalance(address), se accede a la función balanceOf para obtener el balance del al contrato al que nos conectamos con la clave publica.

### Importar Wallet 

Esta vez se utiliza la función ethers.Wallet.(privateKey), para imp[ortar una wallet a partir de una clave privada.
La wallet imprtada se encriptara y guardara en un JSONFile.

### New Wallet

tiliza la funcion ethers.Wallet.createRandom(), a partir de esta se crea una wallet con una clave privada random, al crearala se encriptara y guardara en el JSONFile.

### Private Key

Esta funcion nos mostra la clave privada de la wallet selecionada. Para tener mayor seguridad nos pedira la contraseña y desencriptara la privatekey desde el JSONFile y nos la mostrara en pantalla.

### Seeds

Esta funcion nos mostra la frase semilla de la wallet selecionada. Para tener mayor seguridad nos pedira la contraseña y desencriptara la privatekey desde el JSONFile y nos la mostrara en pantalla.

### Historial
Aqui se uiliza etherscanProvider.getHistory(address) y la misma se conecta con la API de EtherScan, devuelve el historial de transaccion de la wallat en la red seleccionada anteriomente.

## Bibliografía

https://julien-maffre.medium.com/what-is-an-ethereum-keystore-file-86c8c5917b97

https://ethereum.stackexchange.com/questions/70017/can-someone-explain-the-meaning-of-derivation-path-in-wallet-in-plain-english-s

https://reactnative.dev/

https://expo.dev/

https://docs.ethers.io/v5/

https://jetsoanalin.github.io/EthersJsTutorialJetso/

https://youtube.com

https://developer.mozilla.org/

