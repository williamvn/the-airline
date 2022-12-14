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
import { removeAllListener } from '../../helpers/RemoveAllListeners';
import { LoaderContext } from '../../contexts/LoaderContext/LoaderContext';
import { Loader } from '../Loader/Loader';

function App() {
  const { setUserClient } = useContext(UserContext);
  const { account, updateBalance } = useContext(Web3Context);
  const { isLoading } = useContext(LoaderContext);

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

  return (
    <div className={styles.App}>
      <Header></Header>
      <div className={styles["App-body"]}>
        <div className={styles.row}>
          <BalancePanel></BalancePanel>
          <PointsPanel></PointsPanel>
        </div>
        <div className={styles.row}>
          <AvailableFlightsPanel></AvailableFlightsPanel>
          <UserFlightsPanel></UserFlightsPanel>
        </div>
      </div>
      {
        isLoading && <Loader></Loader>
      }
    </div >
  );
}

export default App;
