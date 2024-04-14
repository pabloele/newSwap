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

// **************************************************************************************

// export const swapEthToToken = async (tokenName, amount) => {
//   try {
//     let tx = { value: toWei(amount) };
//     const contractObj = await contract();
//     const data = await contractObj.swapEthToToken(tokenName, tx);

//     const receipt = await data.wait();
//     return receipt;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getTokenBalance = async (tokenName, address) => {
//   const contractObj = await contract();
//   const balance = contractObj.getBalance(tokenName, address);
//   return balance;
// };

// export const getTokenAddress = async (tokenName) => {
//   try {
//     const contractObj = await contract();
//     const address = await contractObj.getTokenAddress(tokenName);
//     return address;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const swapTokenToEth = async (tokenName, amount) => {
//   try {
//     const contractObj = await contract();
//     const data = await contractObj.swapTokenToEth(tokenName, toWei(amount));
//     const receipt = await data.wait();
//     return receipt;
//   } catch (error) {}
// };

// export const increaseAllowance = async (tokenName, amount) => {
//   try {
//     const contractObj = await contract();
//     const address = await contractObj.getTokenAddress(tokenName);
//     const tokenContractObj = await tokenContract(address);
//     const data = await tokenContractObj.approve(
//       '0xed697701e8b9c39cb8a5dac98355d035fb5e6389',
//       toWei(amount)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const hasValidAllowance = async (owner, tokenName, amount) => {
//   try {
//     const contractObj = await contract();
//     const address = await contractObj.getTokenAddress(tokenName);

//     const tokenContractObj = await tokenContract(address);

//     const data = await tokenContractObj.allowance(
//       owner,
//       '0xed697701e8b9c39cb8a5dac98355d035fb5e6389'
//     );

//     const result = BigNumber.from(data.toString()).gte(
//       BigNumber.from(toWei(amount))
//     );
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export async function swapTokenToToken(srcToken, destToken, amount) {
//   try {
//     const contractObj = await contract();
//     const data = await contractObj.swapTokenToToken(
//       srcToken,
//       destToken,
//       toWei(amount)
//     );

//     const receipt = await data.wait();
//     return receipt;
//   } catch (e) {
//     return parseErrorMsg(e);
//   }
// }

// **************************************************************************************

//viniswap

// export const getEthPrice = async () => {
//   try {
//     // Obtener la instancia del contrato router
//     const contractObj = await routerContract();

//     // Definir los parámetros de entrada
//     const amountIn = 1000000;
//     const path = [WETH_ADDRESS, TOKEN_ADDRESS];

//     // Llamar a la función del contrato para obtener las cantidades
//     const amounts = await contractObj.getAmountsOut(amountIn, path);

//     // Convertir los objetos BigNumber a números legibles para humanos con la precisión adecuada
//     const price = amounts.map((amount) => ethers.utils.formatUnits(amount, 6)); // Suponiendo una precisión decimal de 6

//     console.log('Cantidades:', price);
//     return price;
//   } catch (error) {
//     console.log(error);
//   }
// };

// getEthPrice();

// export const getTokenPrice = async () => {
//   try {
//     // Obtener la instancia del contrato router
//     const contractObj = await routerContract();

//     // Definir el token de salida y el token de entrada (ethers)
//     const tokenOut = TOKEN_ADDRESS; // Token de salida
//     const tokenIn = WETH_ADDRESS; // Token de entrada (ethers)

//     // Definir la cantidad de salida deseada (1 unidad del token de salida)
//     // const amountOut = ethers.utils.parseUnits('1', 18); // Suponiendo que el token de salida tiene 18 decimales
//     const amountOut = 1; // Suponiendo que el token de salida tiene 18 decimales

//     // Obtener las cantidades de entrada necesarias
//     const amounts = await contractObj.getAmountsIn(amountOut, [
//       tokenOut,
//       tokenIn,
//     ]);

//     // Obtener la cantidad de ethers necesarios para recibir 1 unidad del token de salida
//     const ethersNeeded = ethers.utils.formatEther(amounts[0]);

//     console.log(
//       'Cantidad de ethers necesarios para recibir 1 unidad del token de salida:',
//       ethersNeeded * 10 ** 14
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// getTokenPrice();

// export const tokenBalance = async () => {
//   try {
//     const tokenContractObj = await tokenContract(TOKEN_ADDRESS);
//     const routerObj = await routerContract();
//     const walletAddress = await routerObj.signer.getAddress();

//     const name = await tokenContractObj.name();
//     const balance = await tokenContractObj.balanceOf(walletAddress);
//     const formatedBalance = toEth(balance).toString();
//     console.log(name);
//     console.log(formatedBalance);
//     return formatedBalance;
//   } catch (error) {
//     console.log(error);
//   }
// };

// tokenBalance();

// export const wethBalance = async () => {
//   try {
//     const routerObj = await routerContract();
//     const walletAddress = await routerObj.signer.getAddress();
//     const wethContractObj = await wethContract(WETH_ADDRESS);
//     const name = await wethContractObj.name();
//     const balance = await wethContractObj.balanceOf(walletAddress);
//     const formatedBalance = toEth(balance).toString();
//     console.log(name);
//     console.log(formatedBalance);
//     return formatedBalance;
//   } catch (error) {
//     console.log(error);
//   }
// };

// wethBalance();

// export const tokenAllowance = async () => {
//   try {
//     const routerObj = await routerContract();
//     const walletAddress = await routerObj.signer.getAddress();
//     console.log(walletAddress);
//     const tokenContractObj = await tokenContract(TOKEN_ADDRESS);
//     const name = await tokenContractObj.name();
//     const allowance = await tokenContractObj.allowance(
//       walletAddress,
//       routerObj.address
//     );
//     const formattedAllowance = toEth(allowance).toString();
//     console.log('Nombre del token:', name);
//     console.log('Alloance:', formattedAllowance);

//     return formattedAllowance;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const wethAllowance = async () => {
//   try {
//     const routerObj = await routerContract();
//     const walletAddress = await routerObj.signer.getAddress();
//     console.log(walletAddress);
//     const wethContractObj = await wethContract(WETH_ADDRESS);
//     const name = await wethContractObj.name();
//     const allowance = await wethContractObj.allowance(
//       walletAddress,
//       routerObj.address
//     );
//     const formattedAllowance = toEth(allowance).toString();
//     console.log('Nombre del token:', name);
//     console.log('Alloance:', formattedAllowance);

//     return formattedAllowance;
//   } catch (error) {
//     console.log(error);
//   }
// };
// // wethAllowance();
// // tokenAllowance();

// export const increaseTokenAllowance = async () => {
//   try {
//     const routerObj = await routerContract();
//     const tokenContractObj = await tokenContract(TOKEN_ADDRESS);
//     const walletAddress = await routerObj.signer.getAddress();
//     console.log(walletAddress);
//     const name = await tokenContractObj.name();
//     const totalAmount = await tokenBalance();
//     console.log(totalAmount);
//     const allowance = await tokenContractObj.approve(
//       routerObj.address,
//       toWei(totalAmount).toString()
//     );
//     console.log('Aprobación exitosa:', allowance);
//   } catch (error) {
//     console.log(error);
//   }
// };
// // increaseTokenAllowance();

// const swapTokensToWeth = async () => {
//   const routerObj = await routerContract();
//   if (!routerObj) {
//     console.error('No se pudo obtener el contrato del router');
//     return;
//   }

//   const signer = await routerObj.provider.getSigner();
//   const initialTokenBalance = await tokenBalance();
//   const initialWethBalance = await wethBalance();
//   console.log(initialTokenBalance, initialWethBalance);

//   try {
//     const tx = await routerObj.connect(signer).swapExactTokensForTokens(
//       toWei('5'), // Cantidad exacta de tokens de entrada (1 token)
//       0, // Cantidad mínima de tokens de salida
//       [
//         // Ruta de tokens (de TOKEN_ADDRESS a WETH_ADDRESS)
//         TOKEN_ADDRESS,
//         WETH_ADDRESS,
//       ],
//       signer.getAddress(), // Dirección del destinatario de los tokens de salida
//       Math.floor(Date.now() / 1000) + 60 * 10 // Plazo de validez de la transacción
//     );
//     await tx.wait();
//     const afterSwapTokenBalance = await tokenBalance();
//     const afterSwapWethBalance = await wethBalance();
//     console.log(afterSwapTokenBalance, afterSwapWethBalance);
//   } catch (error) {
//     console.log(error);
//   }
// };

// swapTokensToWeth();

// export const checkFeeMovement = async () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const { ethereum } = window;

//   if (ethereum) {
//     try {
//       const feeToSetterAddress = '0xdbdBAe70108E4AE35EB98397e65E16ED2A051723';
//       // Consultar el balance de la dirección feeToSetter
//       const balance = await provider.getBalance(feeToSetterAddress);
//       console.log(
//         'Balance en feeToSetter:',
//         ethers.utils.formatEther(balance),
//         'ETH'
//       );
//       // Consultar las transacciones recientes de la dirección feeToSetter
//       // Obtener las transacciones recientes relacionadas con feeToSetter
//       const latestBlockNumber = await provider.getBlockNumber();
//       const startBlockNumber = latestBlockNumber - 100; // Obtener transacciones de los últimos 100 bloques
//       const feeTransactions = [];

//       for (let i = startBlockNumber; i <= latestBlockNumber; i++) {
//         const block = await provider.getBlock(i);

//         for (const txHash of block.transactions) {
//           const tx = await provider.getTransaction(txHash);
//           if (tx.from === feeToSetterAddress || tx.to === feeToSetterAddress) {
//             feeTransactions.push(tx);
//           }
//         }
//       }

//       console.log(
//         'Transacciones recientes relacionadas con feeToSetter:',
//         feeTransactions
//       );
//     } catch (error) {
//       console.log('Error al verificar el movimiento del fee:', error);
//     }
//   }
// };
// checkFeeMovement();
// Función para reclamar el fee
// export const claimFee = async () => {
//   try {
//     const routerObj = await routerContract();
//     const signer = await routerObj.provider.getSigner();
//     const transaction = await routerObj.connect(signer).;
//     await transaction.wait();
//     console.log('Fee reclamado correctamente');
//   } catch (error) {
//     console.log('Error al reclamar el fee:', error);
//   }
// };
// claimFee();
