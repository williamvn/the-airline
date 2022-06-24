import styles from './App.module.css';
import { Panel } from '../Panel/Panel';
import { useContext, useEffect, useState } from 'react';
import ContenLabel from '../ContentLabel/ContentLabel';
import FlightList from '../FlightList/FlightList';
import { useAvailableFlights } from '../../Hooks/useAvailableFlights';
import { useUserClient } from '../../Hooks/useUserClient';
import BookFlightPopup from '../BookFlightPopup/BookFlightPopup';
import { Web3Context } from '../../contexts/Web3Context';
import { AirlineService } from '../../services/AirlineService';
import { useCallback } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const availableFlights = useAvailableFlights();
  const [userClient, setUserClient] = useUserClient();
  const [showBookFlightPopup, setShowBookFlightPopup] = useState(false);
  const { provider: web3, account } = useContext(Web3Context);

  const exchangePoints = async () => {
    const airlineService = await AirlineService.getInstance();
    await airlineService.reclaimPoints(account);
    alert("Operation Finished! Please refresh");
  }

  const updateBalance = useCallback(
    async () => {
      let balance = (await web3.eth.getBalance(account));
      balance = web3.utils.fromWei(balance, 'ether');
      setBalance(balance);
    },
    [web3, account],
  )


  useEffect(() => {
    (async () => {
      updateBalance();
      const airlineService = await AirlineService.getInstance();
      let flightBookedEvent = airlineService.getflightBookedEvent();
      flightBookedEvent.removeAllListeners();

      flightBookedEvent.on('data', ((event) => {
        if (account === event.args.user.toLowerCase()) {
          updateBalance();
          airlineService.getUser(account).then(user => setUserClient(user));
        }
      }));

      return () => {
        //Remove subscription
        flightBookedEvent.removeAllListener();
      }
    })();
  }, [web3, account, updateBalance, setUserClient]);




  return (
    <div className={styles.App}>
      <div className={styles["navbar-title"]}>
        Wellcome to the airline
        <div className={styles['tool-tip']}>
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <span className={styles["tool-tip-text"]}>{account}</span>
        </div>
      </div>
      <header className={styles["App-header"]}>
        <div className={styles.row}>
          <Panel title="Balance">
            <ContenLabel content={balance + " ETH"}></ContenLabel>
          </Panel>
          <Panel title="Loyality points - refundable ether" actionIconClass="fa fa-exchange" actionPlaceHolder="Exchange Points for Ether" action={() => exchangePoints()}>
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
      {showBookFlightPopup && <BookFlightPopup onClose={() => setShowBookFlightPopup(false)}></BookFlightPopup>}
    </div >
  );
}

export default App;
