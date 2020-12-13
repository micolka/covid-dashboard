import React, { useEffect, useState } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Map from '@/components/Map/Map';
import Stats from '@/components/Stats/Stats';
import Table from '@/components/Table/Table';

import { getSummary } from './API/API';
import { TSummary } from './API/APITypes';
import styles from './assets/stylesheets/index.scss';
import MainPreloader from './components/Preloaders/MainPreloader';

const App = (): JSX.Element => {
  const initialState: TSummary = {
    Message: '',
    Global: {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0,
    },
    Countries: [],
    Date: '',
  };
  const [summary, setSummary] = useState(initialState);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const data = await getSummary();
      setSummary(data);
      setLoading(false);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

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
      <Stats />
      <Table />
      <Footer />
    </div>
  );
};

export default App;
