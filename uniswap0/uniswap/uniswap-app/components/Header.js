import React, { useEffect, useState } from 'react';
import NavItems from './NavItems';
import toast, { Toaster } from 'react-hot-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import TokenBalance from './TokenBalance';

const Header = () => {
  const [tokenBalComp, setTokenBalComp] = useState();
  const { address } = useAccount();

  const notifyConectWallet = () => {
    toast.error('Connect your wallet', { duration: 2000 });
  };

  useEffect(() => {
    setTokenBalComp(
      <>
        <TokenBalance name={'MTB24'} walletAddress={address} />
        <TokenBalance name={'WETH'} walletAddress={address} />
      </>
    );
  }, [address]);

  return (
    <div className="fixed left-0 top-0 w-full px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="./uniswap.png" className="h-12" />
        <NavItems />
      </div>

      <div className="flex items-center">{tokenBalComp}</div>

      <div className="flex">
        <ConnectButton />
      </div>

      <Toaster />
    </div>
  );
};

export default Header;
