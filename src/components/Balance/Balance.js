import React from 'react';
import styles from './Balance.module.css';

const Balance = ({balance}) => (
  <div className={styles.Balance} data-testid="Balance">
    {balance} ETH 
  </div>
);
export default Balance;
