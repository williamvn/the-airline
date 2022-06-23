import styles from './App.module.css';
import { Panel } from '../Panel/Panel';
import { useContext, useEffect, useState } from 'react';
import ContenLabel from '../ContentLabel/ContentLabel';
import FlightList from '../FlightList/FlightList';
import { useAvailableFlights } from '../../Hooks/useAvailableFlights';
import { useUserClient } from '../../Hooks/useUserClient';
import BookFlightPopup from '../BookFlightPopup/BookFlightPopup';
import { Web3Context } from '../../contexts/Web3Context';

function App() {
  const [user, setUser] = useState({ account: "", balance: 0 });
  const availableFlights = useAvailableFlights();
  const userClient = useUserClient();
  const [showBookFlightPopup, setShowBookFlightPopup] = useState(false);
  const {provider:web3, account} = useContext(Web3Context);

  useEffect(() => {
    (async () => {
        let balance = (await web3.eth.getBalance(account));
        balance = web3.utils.fromWei(balance, 'ether');
        setUser({ account, balance });
    })();
  }, [web3, account]);

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
          <Panel title="Loyality points - refundable ether"  actionIconClass="fa fa-plus-square-o" actionPlaceHolder="Exchange Points for Ether" action={() => setShowBookFlightPopup(true)}>
            <ContenLabel content={userClient.loyalityPoints + " points"}></ContenLabel>
          </Panel>
        </div>
        <div className={styles.row}>
          <Panel title="Available Flights" >
            <FlightList flights={availableFlights}></FlightList>
          </Panel>
          <Panel title="Your flights" actionIconClass="fa fa-plus-square-o" actionPlaceHolder="Book New Flight" action={() => setShowBookFlightPopup(true)}>
            <FlightList flights={userClient.bookedFlights}></FlightList>
          </Panel>
        </div>
      </header>
      {showBookFlightPopup && <BookFlightPopup onClose={()=> setShowBookFlightPopup(false)}></BookFlightPopup>}
    </div >
  );
}

export default App;
