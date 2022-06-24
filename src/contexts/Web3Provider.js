import React, { useEffect } from 'react'
import { useState } from 'react';
import { useWeb3 } from '../Hooks/useWeb3';
import { Web3Context } from './Web3Context'

export const Web3Provider = ({ children }) => {
  const web3 = useWeb3();
  const [account, setAccount] = useState();

  useEffect(() => {
    if (web3) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        setAccount(accounts[0].toLowerCase());
      });

      web3.eth.getAccounts().then(accounts => setAccount(accounts[0].toLowerCase()));
      setTimeout(() => account && console.error("No Account Connected!"), 5000);
    }
  }, [web3])

  return (
    <Web3Context.Provider value={{provider: web3, account: account}}>
      {account ? children : <p>Loading....</p>}
    </Web3Context.Provider>
  )
}
