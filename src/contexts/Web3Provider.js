import React from 'react'
import { useWeb3 } from '../Hooks/useWeb3';
import { Web3Context } from './Web3Context'

export const Web3Provider = ({children}) => {
  const web3 = useWeb3();
  
  return (
    <Web3Context.Provider value={web3}>
        {web3?children: <p>Loading....</p>}
    </Web3Context.Provider>
  )
}
