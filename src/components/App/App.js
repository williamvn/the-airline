import styles from './App.module.css';
import { Panel } from '../Panel/Panel';
import { useEffect, useState } from 'react';
import { useWeb3 } from '../../Hooks/useWeb3';
import ContenLabel from '../ContentLabel/ContentLabel';
import FlightList from '../FlightList/FlightList';
import { useAvailableFlights } from '../../Hooks/useAvailableFlights';
import { useUserClient } from '../../Hooks/useUserClient';

function App() {
  const web3 = useWeb3();
  const [user, setUser] = useState({ account: "", balance: 0 });
  const availableFlights = useAvailableFlights();
  const userClient = useUserClient();

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

  return (
    <div className={styles.App}>
      <div className={styles["navbar-title"]}>
        Wellcome to the airline
        <div className={styles['tool-tip']}>
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <span className={styles["tool-tip-text"]}>{user.account}</span>
        </div>
      </div>
      <header className={styles["App-header"]}>
        <div className={styles.row}>
          <Panel title="Balance">
            <ContenLabel content={user.balance + " ETH"}></ContenLabel>
          </Panel>
          <Panel title="Loyality points - refundable ether" >
            <ContenLabel content={userClient.loyalityPoints + " points"}></ContenLabel>
          </Panel>
        </div>
        <div className={styles.row}>
          <Panel title="Available Flights" >
            <FlightList flights={availableFlights}></FlightList>
          </Panel>
          <Panel title="Your flights" >
            <FlightList flights={userClient.bookedFlights}></FlightList>
          </Panel>
        </div>
      </header >
    </div >
  );
}

export default App;
