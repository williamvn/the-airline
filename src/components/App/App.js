import './App.css';
import { Panel } from '../Panel/Panel';
import { useEffect, useRef, useState } from 'react';
import { useWeb3 } from '../../Hooks/useWeb3';
import Balance from '../Balance/Balance';
import { AirlineService } from '../../services/AirlineService';
import { FlightService } from '../../services/FlightService';

function App() {
  const web3 = useWeb3();
  const [user, setUser] = useState({ account: "", balance: 0 });

  useEffect(() => {
    (async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0].toLowerCase();
        let balance = (await web3.eth.getBalance(account));
        balance = web3.utils.fromWei(balance, 'ether');
        setUser({ account, balance });
      }
    })();
  }, [web3]);

  useEffect(() => {
    (async () => {
      const flightsService = await FlightService.getInstance();
      console.log(await flightsService.getAvailableFlights());
    })();
  }, [])

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
          <Panel title="Balance">
            <Balance balance={user.balance}></Balance>
          </Panel>
          <Panel title="Loyality points - refundable ether" >
            <p>"Some Data: Lorem itsu maki tuki"</p>
          </Panel>
        </div>
        <div className='column'>
          <Panel title="Your flights" >
            <p>"Some Data: Lorem itsu maki tuki"</p>
          </Panel>
          <Panel title="Available Flights" >
            <p>"Some Data: Lorem itsu maki tuki"</p>
          </Panel>
        </div>
      </header>
    </div>
  );
}

export default App;
