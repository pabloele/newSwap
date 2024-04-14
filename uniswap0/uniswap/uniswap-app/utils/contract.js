import { ethers } from 'ethers';
import { UniswapABI, erc20ABI, routerABI, wethABI } from './Uniswap';
import { CustomTokenABI } from './CustomToken';
// const address = '0xeD697701e8b9C39CB8A5dAC98355d035Fb5e6389'; //mumbai

export const tokenContract = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(address, erc20ABI, signer);
    return contractReader;
  }
};
// export const contract = async () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const { ethereum } = window;
//   if (ethereum) {
//     const signer = provider.getSigner();
//     const contractReader = new ethers.Contract(
//       '0xed697701e8b9c39cb8a5dac98355d035fb5e6389',
//       UniswapABI,
//       signer
//     );
//     return contractReader;
//   }
// };
// uniswap
export const wethContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      '0xb53509f682f09df252C9A66f1f67c559Ba30103f',
      wethABI,
      signer
    );
    return contractReader;
  }
};

export const routerContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      '0xA3c6Bc342b9736E91e71206645E6A808F2e54DcB',
      routerABI,
      signer
    );
    return contractReader;
  }
};
