import { BigNumber, ethers } from 'ethers';
import {
  contract,
  routerContract,
  tokenContract,
  wethContract,
} from './contract';
import { toEth, toWei } from './ether-utils';

const WETH_ADDRESS = '0xb53509f682f09df252C9A66f1f67c559Ba30103f';
const TOKEN_ADDRESS = '0x415fE71d7140a1103E2963611d37eAc0Ba511FD7';
const WALLET_ADDRESS = '0xdbdbae70108e4ae35eb98397e65e16ed2a051723';

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

//uniswap

export const getEthPrice = async () => {
  try {
    // Obtener la instancia del contrato router
    const contractObj = await routerContract();

    // Definir los parámetros de entrada
    const amountIn = 1000000;
    const path = [WETH_ADDRESS, TOKEN_ADDRESS];

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
    const tokenOut = TOKEN_ADDRESS; // Token de salida
    const tokenIn = WETH_ADDRESS; // Token de entrada (ethers)

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
      ethersNeeded * 10 ** 14
    );
  } catch (error) {
    console.log(error);
  }
};

getTokenPrice();

export const tokenBalance = async () => {
  try {
    const tokenContractObj = await tokenContract(TOKEN_ADDRESS);
    console.log(tokenContractObj);

    const name = await tokenContractObj.name();
    const balance = await tokenContractObj.balanceOf(WALLET_ADDRESS);
    const formatedBalance = toEth(balance).toString();
    console.log(name);
    console.log(formatedBalance);
    return formatedBalance;
  } catch (error) {
    console.log(error);
  }
};

// tokenBalance();

export const wethBalance = async () => {
  try {
    const wethContractObj = await wethContract(WETH_ADDRESS);
    console.log(wethContractObj);

    const name = await wethContractObj.name();
    const balance = await wethContractObj.balanceOf(WALLET_ADDRESS);
    const formatedBalance = toEth(balance).toString();
    console.log(name);
    console.log(formatedBalance);
    return formatedBalance;
  } catch (error) {
    console.log(error);
  }
};

// wethBalance();

const swap = async () => {
  const routerObj = await routerContract();
  if (!routerObj) {
    console.error('No se pudo obtener el contrato del router');
    return;
  }

  const signer = await routerObj.provider.getSigner();
  const initialTokenBalance = await tokenBalance();
  const initialWethBalance = await wethBalance();
  console.log(initialTokenBalance, initialWethBalance);

  try {
    const tx = await routerObj.connect(signer).swapExactTokensForTokens(
      toWei('1'), // Cantidad exacta de tokens de entrada (1 token)
      0, // Cantidad mínima de tokens de salida
      [
        // Ruta de tokens (de TOKEN_ADDRESS a WETH_ADDRESS)
        TOKEN_ADDRESS,
        WETH_ADDRESS,
      ],
      signer.getAddress(), // Dirección del destinatario de los tokens de salida
      Math.floor(Date.now() / 1000) + 60 * 10 // Plazo de validez de la transacción
    );
    await tx.wait();
    const afterSwapTokenBalance = await tokenBalance();
    const afterSwapWethBalance = await wethBalance();
    console.log(afterSwapTokenBalance, afterSwapWethBalance);
  } catch (error) {
    console.log(error);
  }
};

swap();
