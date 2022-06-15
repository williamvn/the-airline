import React from 'react';
import PropTypes from 'prop-types';
import styles from './FlightList.module.css';

const FlightList = ({ flights }) => (

  <ul className={styles.FlightList} data-testid="FlightList">
    {
      flights.map(flight =>
        <li key={flight.number} className={styles.flight}>
          <div className={styles.header}>
            {flight.number}
            <div className={styles.badge}>
              {flight.price} ETH
            </div>
          </div>
          <div className={styles.route}>
            <i className={`fa fa-plane ${styles.plane}`}></i>
            <span>{flight.origin}</span>
            <hr/>
            <span>{flight.destination}</span>
          </div>

        </li>
      )
    }
    { flights.length == 0 && 
      <div className={styles.center}>
        <p>No Flights</p>
      </div>
    }
  </ul>
);

FlightList.propTypes = {
  number: PropTypes.string,
  origin: PropTypes.string,
  destination: PropTypes.string,
  price: PropTypes.string
};

export default FlightList;
