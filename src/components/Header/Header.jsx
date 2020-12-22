import React from 'react';

import VirusSrc from '@/assets/img/virus.png';
import styles from '@/assets/stylesheets/header.scss';

const Header = () => (
  <div className={styles['header-wrapper']}>
    <h1 className={styles['header-title']}>COVID-19 Dashboard</h1>
    <img className={styles['header-logo']} alt="virus" src={VirusSrc} />
  </div>
);

export default Header;
