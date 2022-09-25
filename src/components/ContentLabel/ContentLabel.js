import React from 'react';
import styles from './ContentLabel.module.css';

export const ContenLabel = ({content}) => (
  <div className={styles.content} data-testid="ContentLabel">
    {content} 
  </div>
);