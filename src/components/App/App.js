import styles from './App.module.css';
import { Panel } from '../Panel/Panel';
import { useContext, useEffect, useState } from 'react';
import FlightList from '../FlightList/FlightList';
import BookFlightPopup from '../BookFlightPopup/BookFlightPopup';
import { Web3Context } from '../../contexts/Web3Context/Web3Context';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { AirlineService } from '../../services/AirlineService';
import { PointsPanel } from '../PointsPanel/PointsPanel';
import { AvailableFlightsPanel } from '../AvailableFlightsPanel/AvailableFlightsPanel';
import { BalancePanel } from '../BalancePanel/BalancePanel';

function App() {
  const {userClient, setUserClient} = useContext(UserContext);
  const [showBookFlightPopup, setShowBookFlightPopup] = useState(false);
  const { provider: web3, account, updateBalance } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

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
          setUserClient(account);
        }
      });

      pointsRedeemedEvent.on('data', (event) => {
        if (account === event.args.user.toLowerCase()) {
          updateBalance();
          setUserClient(account);
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
          <BalancePanel></BalancePanel>
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
