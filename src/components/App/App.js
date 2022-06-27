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
import { FlightService } from '../../services/FlightService';

function App() {
  const [balance, setBalance] = useState(0);
  const [availableFlights, setAvailableFlights] = useAvailableFlights();
  const [userClient, setUserClient] = useUserClient();
  const [showBookFlightPopup, setShowBookFlightPopup] = useState(false);
  const { provider: web3, account } = useContext(Web3Context);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const exchangePoints = async () => {
    const airlineService = await AirlineService.getInstance();
    try {
      airlineService.reclaimPoints(account);
      alert("Operation In Progress");
    } catch (error) {
      console.log(error);
      if (error.message.includes("Not enought points")) {
        alert("No enough points");
      }
      else {
        alert("In this moment it is not possible to reclaim points. Try later");
      }
    }
  }

  const updateBalance = useCallback(
    async () => {
      let balance = (await web3.eth.getBalance(account));
      balance = web3.utils.fromWei(balance, 'ether');
      setBalance(balance);
    },
    [web3, account],
  );

  const setOwnerFlag = useCallback(async () => {
    const airlineService = await AirlineService.getInstance();
    airlineService.amIOwner(account).then(value => setIsOwner(value));
  });

  useEffect(() => {
    updateBalance();
    setOwnerFlag();
  }, [updateBalance, setOwnerFlag, account])

  useEffect(() => {
    (async () => {
      const airlineService = await AirlineService.getInstance();
      // Events
      let flightBookedEvent = airlineService.getflightBookedEvent();
      let pointsRedeemedEvent = airlineService.getPointsRedeemedEvent();

      //Remove Old Listeners
      flightBookedEvent.removeAllListeners();
      pointsRedeemedEvent.removeAllListeners();

      // Create new Listeners
      flightBookedEvent.on('data', (event) => {
        if (account === event.args.user.toLowerCase()) {
          updateBalance();
          airlineService.getUser(account).then(user => setUserClient(user));
        }
        else {
          console.log(event);
        }
      });

      pointsRedeemedEvent.on('data', (event) => {
        if (account === event.args.user.toLowerCase()) {
          updateBalance();
          airlineService.getUser(account).then(user => setUserClient(user));
        }
      });

      return () => {
        //Remove subscription
        flightBookedEvent.removeAllListener();
        pointsRedeemedEvent.removeAllListeners();
      }
    })();
  }, [web3, account, setUserClient]);

  const seedFlights = async () => {
    setIsLoading(true);
    const flightService = await FlightService.getInstance();
    await flightService.seedFlights(web3, account);
    const newSeedFlights = await flightService.getAvailableFlights();
    setAvailableFlights(newSeedFlights);
    setIsLoading(false);
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
          <Panel title="Loyality points - refundable ether" actionIconClass="fa fa-exchange" actionPlaceHolder="Exchange Points for Ether" action={() => exchangePoints()}>
            <ContenLabel content={userClient.loyalityPoints + " points"}></ContenLabel>
          </Panel>
        </div>
        <div className={styles.row}>
          <Panel title="Available Flights" actionIconClass={availableFlights.length === 0 && isOwner ? "fa fa-flask" : ""} actionPlaceHolder="Seed Flights" action={() => seedFlights()}>
            <FlightList flights={availableFlights}></FlightList>
          </Panel>
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
