import React, { useCallback, useEffect } from 'react'
import { Loader } from "../../components/Loader/Loader";
import { useState } from 'react';
import { useWeb3 } from '../../hooks/useWeb3';
import { Web3Context } from './Web3Context'

export const Web3Provider = ({ children }) => {
  const web3 = useWeb3();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState(0);

  const updateBalance = useCallback(
    async () => {
      let balance = (await web3.eth.getBalance(account));
      balance = web3.utils.fromWei(balance, 'ether');
      setBalance(balance);
    },
    [web3, account],
  );

  useEffect(() => {
    if (account && web3)
      updateBalance();
  }, [account, web3, updateBalance])

  useEffect(() => {
    if (web3) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        setAccount(accounts[0].toLowerCase());
      });

      web3.eth.getAccounts().then(accounts => setAccount(accounts[0].toLowerCase()));
      setTimeout(() => account && console.error("No Account Connected!"), 5000);
    }
  }, [web3]);

  return (
    <Web3Context.Provider value={{ provider: web3, account, balance, updateBalance }}>
      {account ? children : <Loader></Loader>}
    </Web3Context.Provider>
  )
}
