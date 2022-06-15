import React from 'react';
import styles from './Panel.module.css';

export const Panel = ({title, children, action, actionIconClass, actionPlaceHolder }) => (
  <div className={styles.Panel}  data-testid="Panel">
    <div className={styles.title} >
      <span className={actionIconClass && styles.recenter}>{title}</span>
      {
        actionIconClass &&
        <div className={styles.toolTip}>
          <i className={actionIconClass}  aria-hidden="true" onClick={action}></i>
          <span className={styles.toolTipText}>{actionPlaceHolder}</span>
        </div>
      }
    </div>
    <div className={styles.content} >
      {children}
    </div>
  </div>
);