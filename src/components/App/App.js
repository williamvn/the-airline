import styles from './App.module.css';
import { Panel } from '../Panel/Panel';
import { useContext, useEffect, useState } from 'react';
import ContenLabel from '../ContentLabel/ContentLabel';
import FlightList from '../FlightList/FlightList';
import { useUserClient } from '../../hooks/useUserClient';
import BookFlightPopup from '../BookFlightPopup/BookFlightPopup';
import { Web3Context } from '../../contexts/Web3Context';
import { AirlineService } from '../../services/AirlineService';
import { useCallback } from 'react';
import { PointsPanel } from '../PointsPanel/PointsPanel';
import { AvailableFlightsPanel } from '../AvailableFlightsPanel/AvailableFlightsPanel';

function App() {
  const [balance, setBalance] = useState(0);
  const [userClient, setUserClient] = useUserClient();
  const [showBookFlightPopup, setShowBookFlightPopup] = useState(false);
  const { provider: web3, account } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  const updateBalance = useCallback(
    async () => {
      let balance = (await web3.eth.getBalance(account));
      balance = web3.utils.fromWei(balance, 'ether');
      setBalance(balance);
    },
    [web3, account],
  );

  useEffect(() => {
    updateBalance();
  }, [updateBalance])

  useEffect(() => {
    (async () => {
      const airlineService = await AirlineService.getInstance();
      // Events
      let flightBookedEvent = airlineService.getflightBookedEvent();
      let pointsRedeemedEvent = airlineService.getPointsRedeemedEvent();

      //Remove Old Listeners
      removeAllListener([flightBookedEvent, pointsRedeemedEvent]);

      // Create new Listeners
      flightBookedEvent.on('data', (event) => {
        if (account === event.args.user.toLowerCase()) {
          updateBalance();
          airlineService.getUser(account).then(user => setUserClient(user));
        }
      });

      pointsRedeemedEvent.on('data', (event) => {
        if (account === event.args.user.toLowerCase()) {
          updateBalance();
          airlineService.getUser(account).then(user => setUserClient(user));
        }
      });

      return () => {
        //Remove subscriptions
        removeAllListener([flightBookedEvent, pointsRedeemedEvent]);
      }
    })();
  }, [web3, account, setUserClient, updateBalance]);

  const removeAllListener = (listeners) => {
    listeners.forEach(l => {
      l.removeAllListeners();
    });
  }

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
          <PointsPanel></PointsPanel>
        </div>
        <div className={styles.row}>
          <AvailableFlightsPanel setIsLoading={setIsLoading}></AvailableFlightsPanel>
          <Panel title="Your flights" actionIconClass="fa fa-plus-square-o" actionPlaceHolder="Book New Flight" action={() => setShowBookFlightPopup(true)}>
            <FlightList flights={userClient.bookedFlights}></FlightList>
          </Panel>
        </div>
      </header>
      {showBookFlightPopup && <BookFlightPopup onClose={() => setShowBookFlightPopup(false)}></BookFlightPopup>}
      {
        isLoading && <div className={styles.loaderOverlay}>
          <div class={`spinner-grow text-success ${styles.spinnerLg}`} role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      }
    </div >
  );
}

export default App;
