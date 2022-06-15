import React from 'react';
import { useAvailableFlights } from '../../Hooks/useAvailableFlights';
import styles from './BookFlightPopup.module.css';

const BookFlightPopup = ({ onClose }) => {
  const availableFlights = useAvailableFlights();

  return <div className={styles.modal} onClick={() => onClose()}>
    <form className={`${styles.modalContent} ${styles.BookFlightPopup}`} data-testid="BookFlightPopup" onClick={(e) => e.stopPropagation()}>
      <span className={styles.close}>&times;</span>
      <div className={styles.title}>
        Book a new Flight
      </div>
      <select className="form-select " aria-label="Default select example" onChange={(d)=>console.log(d)}>
        <option defaultValue={{}}>Select Flight</option>
        {
          availableFlights.map((flight) => <option value={flight} key={flight.number}> {flight.number}</option>)
        }
      </select>
      <div className={styles.contentDescription}>
        <div className={styles.route}>
          <i className={`fa fa-plane ${styles.plane}`}></i>
          <span>{"MAD"}</span>
          <hr />
          <span>{"VAR"}</span>
        </div>
        <span>Price: 66 ETH</span>
      </div>
      <button className={`btn btn-success ${styles.bookBtn}`}>Book Flight!</button>

    </form>
  </div>

};

export default BookFlightPopup;
