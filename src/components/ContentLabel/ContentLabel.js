import React from 'react';
import styles from './ContentLabel.module.css';

const ContenLabel = ({content}) => (
  <div className={styles.content} data-testid="ContentLabel">
    {content} 
  </div>
);
export default ContenLabel;
