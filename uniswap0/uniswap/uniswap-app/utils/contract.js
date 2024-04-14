import { ethers } from 'ethers';
import { mtb24ABI, routerABI, wethABI } from './abi';

export const tokenContract = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(address, mtb24ABI, signer);
    return contractReader;
  }
};

export const wethContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      '0x74A4A85C611679B73F402B36c0F84A7D2CcdFDa3',
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
      '0x5E4ebDF023C6e62BbCF6aC0E683641B42EF8e224',
      routerABI,
      signer
    );
    return contractReader;
  }
};
