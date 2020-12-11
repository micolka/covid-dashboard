import React from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Map from '@/components/Map/Map';
import Stats from '@/components/Stats/Stats';
import Table from '@/components/Table/Table';

import styles from './assets/stylesheets/index.scss';

const App = (): JSX.Element => (
  <div className={styles['app-wrapper']}>
    <Header />
    <Map />
    <Stats />
    <Table />
    <Footer />
  </div>
);

export default App;
