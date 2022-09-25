import React from 'react';
import PropTypes from 'prop-types';
import styles from './FlightList.module.css';
import { Web3Context } from '../../contexts/Web3Context/Web3Context';
import { useContext } from 'react';

const FlightList = ({ flights }) => {
  const {provider:web3} = useContext(Web3Context)

  return <ul className={styles.FlightList} data-testid="FlightList">
    {
      flights.map((flight, i) =>
        <li key={flight.number + i} className={styles.flight}>
          <div className={styles.header}>
            {flight.number}
            <div className={styles.badge}>
              {web3.utils.fromWei(flight.price, 'ether')} ETH
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
    { flights.length === 0 && 
      <div className={styles.center}>
        <p>No Flights</p>
      </div>
    }
  </ul>
};

FlightList.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  price: PropTypes.string
};

export default FlightList;
