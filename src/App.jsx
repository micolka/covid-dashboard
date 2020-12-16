import React, { useEffect, useState } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Map from '@/components/Map/Map';
import Stats from '@/components/Stats/Stats';
import Table from '@/components/Table/Table';

import { getSummary, getPopulation } from './API/API';
import styles from './assets/stylesheets/index.scss';
import MainPreloader from './components/Preloaders/MainPreloader';
import { appInitialState } from './config';

const App = () => {
  const [summary, setSummary] = useState(appInitialState);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const summaryData = await getSummary();
      const population = await getPopulation();
      setSummary({ ...summaryData, population });
      setLoading(false);
    }

    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles['app-wrapper']}>
        <div className={styles['preloader-wrapper']}>
          <MainPreloader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['app-wrapper']}>
      <Header />
      <Map summary={summary} />
      <Stats summary={summary} />
      <Table summary={summary} />
      <Footer />
    </div>
  );
};

export default App;
