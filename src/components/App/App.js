import './App.css';
import { Panel } from '../Panel/Panel';
import { useEffect, useRef, useState } from 'react';
import { useWeb3 } from '../../Hooks/useWeb3';
import getAirline from "../../providers/airline";

function App() {
  const web3 = useWeb3();
  const [user, setUser] = useState({ account: "", balance: 0 });
  const airline = useRef(null);

  useEffect(() => {
    (async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0].toLowerCase();
        const balance = await web3.eth.getBalance(account);
        setUser({ account, balance });
        console.log(balance);
      }
    })();

  }, [web3])

  return (
    <div className="App">
      <div className='navbar-title'>
        Wellcome to the airline
        <div className='tool-tip'>
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <span className="tool-tip-text">{user.account}</span>
        </div>
      </div>
      <header className="App-header">
        <div className='column'>
          <Panel title="Balance" data={user.balance}></Panel>
          <Panel title="Loyality points - refundable ether" data="Some Data: Lorem itsu maki tuki"></Panel>
        </div>
        <div className='column'>
          <Panel title="Your flights" data="Some Data: Lorem itsu maki tuki"></Panel>
          <Panel title="Available Flights" data="Some Data: Lorem itsu maki tuki"></Panel>
        </div>
      </header>
    </div>
  );
}

export default App;
