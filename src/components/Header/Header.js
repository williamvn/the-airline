import styles from './Header.module.css';
import React, { useContext } from 'react'
import { Web3Context } from '../../contexts/Web3Context/Web3Context';

export const Header = () => {
  const { account } = useContext(Web3Context);

    return (
        <div className={styles["navbar-title"]}>
            Welcome to the airline
            <div className={styles['tool-tip']}>
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                <span className={styles["tool-tip-text"]}>{account}</span>
            </div>
        </div>
    )
}
