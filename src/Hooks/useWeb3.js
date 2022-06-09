import { useEffect, useState } from 'react'
import getWeb3 from '../getWeb3';

export const useWeb3 = () => {
    const [web3, setWeb3] = useState();
    useEffect(() => {
        getWeb3().then(provider =>
            setWeb3(provider)
        );
    }, []);
    return web3;
}
