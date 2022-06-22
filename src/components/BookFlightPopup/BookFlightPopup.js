import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { useAvailableFlights } from '../../Hooks/useAvailableFlights';
import { AirlineService } from '../../services/AirlineService';
import styles from './BookFlightPopup.module.css';

const BookFlightPopup = ({ onClose }) => {
  const availableFlights = useAvailableFlights();
  const [flight, setFlight] = useState({});
  const [flightsMap, setFlightsMap] = useState({});
  const web3 = useContext(Web3Context);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (availableFlights.length > 0) {
      setFlight(availableFlights[0]);

      const map = availableFlights.reduce((acc, current) => {
        acc[current.number] = current;
        return acc;
      }, {});

      setFlightsMap(map);
    }
  }, [availableFlights]);


  const selectFlight = (e) => {
    const selectedFlight = flightsMap[e.target.value];
    setFlight(selectedFlight);
  }

  const bookFlight = async (e) => {
    e.preventDefault();
    const flightNumber = flight.number;
    const airlineService = await AirlineService.getInstance();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0].toLowerCase();
    const price = await web3.utils.toWei(flightsMap[flightNumber].price);
    setIsDisabled(true);
    try {
      await airlineService.bookFlight(flightNumber, account, price);
      closeDialog();
    } catch (error) {
      console.error(error.message);
      setError("Sorry! The transaction has failed, check if you have enought funds");
      setTimeout(()=> {setError(null)}, 3000);
    }
    setIsDisabled(false);
  }

  const closeDialog = () => {
    if (!isDisabled) {
      onClose();
    }
  }

  return <div className={styles.modal} onClick={() => closeDialog()}>
    <form className={`${styles.modalContent} ${styles.BookFlightPopup}`} data-testid="BookFlightPopup" onClick={(e) => e.stopPropagation()} onSubmit={bookFlight}>
      <span className={`${styles.close} ${isDisabled && styles.closeDisabled}`} onClick={() => closeDialog()}>&times;</span>
      <div className={styles.title}>
        Book a new Flight
      </div>
      <div className={styles.flightSelect}>
        <span> Select Flight</span>
        <select className="form-select " aria-label="Default select example" value={flight.number} onChange={selectFlight} disabled={isDisabled}>
          {
            availableFlights.map((flight) => <option value={flight.number} key={flight.number}> {flight.number}</option>)
          }
        </select>
      </div>
      <div className={styles.contentDescription}>
        <div className={styles.route}>
          <i className={`fa fa-plane ${styles.plane}`}></i>
          <span>{flight.origin}</span>
          <hr />
          <span>{flight.destination}</span>
        </div>
        <span>Price: {flight.price} ETH</span>
        <br/>
        {isDisabled && <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>}
        {
          error && <div className={styles.errorText}>{error}</div>
        }
      </div>
      <button className={`btn btn-success ${styles.bookBtn}`} disabled={isDisabled}>Book Flight!</button>
    </form>
  </div>

};

export default BookFlightPopup;
