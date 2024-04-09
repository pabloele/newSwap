import { BigNumber, ethers } from 'ethers';
import { contract, tokenContract, routerContract } from './contract';
import { toEth, toWei } from './ether-utils';

export const swapEthToToken = async (tokenName, amount) => {
  try {
    let tx = { value: toWei(amount) };
    const contractObj = await contract();
    const data = await contractObj.swapEthToToken(tokenName, tx);

    const receipt = await data.wait();
    return receipt;
  } catch (error) {
    console.log(error);
  }
};

export const getTokenBalance = async (tokenName, address) => {
  const contractObj = await contract();
  const balance = contractObj.getBalance(tokenName, address);
  return balance;
};

export const getTokenAddress = async (tokenName) => {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);
    return address;
  } catch (error) {
    console.log(error);
  }
};

export const swapTokenToEth = async (tokenName, amount) => {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapTokenToEth(tokenName, toWei(amount));
    const receipt = await data.wait();
    return receipt;
  } catch (error) {}
};

export const increaseAllowance = async (tokenName, amount) => {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);
    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.approve(
      '0xed697701e8b9c39cb8a5dac98355d035fb5e6389',
      toWei(amount)
    );
  } catch (error) {
    console.log(error);
  }
};

export const hasValidAllowance = async (owner, tokenName, amount) => {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);

    const tokenContractObj = await tokenContract(address);

    const data = await tokenContractObj.allowance(
      owner,
      '0xed697701e8b9c39cb8a5dac98355d035fb5e6389'
    );

    const result = BigNumber.from(data.toString()).gte(
      BigNumber.from(toWei(amount))
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export async function swapTokenToToken(srcToken, destToken, amount) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapTokenToToken(
      srcToken,
      destToken,
      toWei(amount)
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// uniswap real

export const getEthPrice = async () => {
  try {
    // Obtener la instancia del contrato router
    const contractObj = await routerContract();

    // Definir los parámetros de entrada
    const amountIn = 1000000;
    const path = [
      '0xb53509f682f09df252C9A66f1f67c559Ba30103f',
      '0x415fE71d7140a1103E2963611d37eAc0Ba511FD7',
    ];

    // Llamar a la función del contrato para obtener las cantidades
    const amounts = await contractObj.getAmountsOut(amountIn, path);

    // Convertir los objetos BigNumber a números legibles para humanos con la precisión adecuada
    const price = amounts.map((amount) => ethers.utils.formatUnits(amount, 6)); // Suponiendo una precisión decimal de 6

    console.log('Cantidades:', price);
    return price;
  } catch (error) {
    console.log(error);
  }
};

getEthPrice();

export const getTokenPrice = async () => {
  try {
    // Obtener la instancia del contrato router
    const contractObj = await routerContract();

    // Definir el token de salida y el token de entrada (ethers)
    const tokenOut = '0x415fE71d7140a1103E2963611d37eAc0Ba511FD7'; // Token de salida
    const tokenIn = '0xb53509f682f09df252C9A66f1f67c559Ba30103f'; // Token de entrada (ethers)

    // Definir la cantidad de salida deseada (1 unidad del token de salida)
    // const amountOut = ethers.utils.parseUnits('1', 18); // Suponiendo que el token de salida tiene 18 decimales
    const amountOut = 1; // Suponiendo que el token de salida tiene 18 decimales

    // Obtener las cantidades de entrada necesarias
    const amounts = await contractObj.getAmountsIn(amountOut, [
      tokenOut,
      tokenIn,
    ]);

    // Obtener la cantidad de ethers necesarios para recibir 1 unidad del token de salida
    const ethersNeeded = ethers.utils.formatEther(amounts[0]);

    console.log(
      'Cantidad de ethers necesarios para recibir 1 unidad del token de salida:',
      ethersNeeded * 10 ** 18
    );
  } catch (error) {
    console.log(error);
  }
};

getTokenPrice();

// export const logBalance = async (address) => {
//   const contractObj = await tokenContract();
//   let ethBalance;
//   let wethBalance;
//   let falopaCoinABalance;
//   // falopaCoinABalance = await contractObj.balanceOf(address);
//   console.log('**************', falopaCoinABalance);
// };

// logBalance();
// async function comprarToken(cantidadEther) {
//   try {
//     // Definir la cantidad de ethers a intercambiar
//     const cantidadEtherEnWei = toWei(cantidadEther);

//     // Obtener la instancia del contrato del router
//     const router = await routerContract();

//     // Definir la ruta de intercambio (ether -> token)
//     const ruta = [
//       '0xb53509f682f09df252C9A66f1f67c559Ba30103f', // dirección de ethers en la red Ethereum
//       '0x415fe71d7140a1103e2963611d37eac0ba511fd7', // dirección del contrato del token
//     ];
//     console.log(hola);
//     // Ejecutar la transacción de intercambio
//     const tx = await router.swapExactETHForTokens(
//       0, // cantidad mínima de tokens de salida
//       ruta, // ruta de intercambio
//       ethers.constants.AddressZero, // dirección del destinatario (opcional)
//       Date.now() + 1000 * 60 * 10, // límite de tiempo para la transacción (10 minutos)
//       { value: cantidadEtherEnWei } // valor en ethers a enviar con la transacción
//     );
//     console.log('espera');
//     // Esperar a que se complete la transacción
//     const receipt = await tx.wait();
//     console.log('Transacción completada:', receipt);
//   } catch (error) {
//     console.error('Error al comprar el token:', error);
//   }
// }

// // Uso de la función para comprar el token con 1 ether
// comprarToken(0.01);
