import { useContext, useEffect, useState } from 'react';
import styles from './App.module.css';
import { Header } from '../Header/Header';
import { PointsPanel } from '../PointsPanel/PointsPanel';
import { BalancePanel } from '../BalancePanel/BalancePanel';
import { UserFlightsPanel } from '../UserFlightsPanel/UserFlightsPanel';
import { AvailableFlightsPanel } from '../AvailableFlightsPanel/AvailableFlightsPanel';
import { Web3Context } from '../../contexts/Web3Context/Web3Context';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { AirlineService } from '../../services/AirlineService';

function App() {
  const { setUserClient } = useContext(UserContext);
  const { account, updateBalance } = useContext(Web3Context);
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
  }, [account, setUserClient, updateBalance]);

  const removeAllListener = (listeners) => {
    listeners.forEach(l => {
      l.removeAllListeners();
    });
  }

  return (
    <div className={styles.App}>
      <Header></Header>
      <div className={styles["App-body"]}>
        <div className={styles.row}>
          <BalancePanel></BalancePanel>
          <PointsPanel></PointsPanel>
        </div>
        <div className={styles.row}>
          <AvailableFlightsPanel setIsLoading={setIsLoading}></AvailableFlightsPanel>
          <UserFlightsPanel></UserFlightsPanel>
        </div>
      </div>
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
