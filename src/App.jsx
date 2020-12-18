import React, { useEffect, useState, useReducer } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Map from '@/components/Map/Map';
import Stats from '@/components/Stats/Stats';
import Table from '@/components/Table/Table';

import { getSummary, getPopulation } from './API/API';
import styles from './assets/stylesheets/index.scss';
import MainPreloader from './components/Preloaders/MainPreloader';
import { appInitialState } from './core/config';
import { ContextApp, initialReducerState, appReducer } from './core/reducer';

function updateSummaryData(Countries, populationData) {
  return Countries.map(summaryElem => {
    const country = populationData
      .find(populationElem => populationElem.alpha2Code === summaryElem.CountryCode);
    return { ...summaryElem, population: country.population };
  });
}

const App = () => {
  const [summary, setSummary] = useState(appInitialState);
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(appReducer, initialReducerState);

  useEffect(() => {
    async function fetchData() {
      const summaryData = await getSummary();
      const populationData = await getPopulation();
      setSummary({
        ...summaryData,
        Countries: updateSummaryData(summaryData.Countries, populationData),
      });
      setLoading(false);
    }

    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  return (
    <div className={styles['app-wrapper']}>
      {
        isLoading ? (
          <div className={styles['preloader-wrapper']}>
            <MainPreloader />
          </div>
        ) : (
          <React.Fragment>
            <ContextApp.Provider value={{ dispatch, state }}>
              <Header />
              <Map summary={summary} />
              <Stats summary={summary} />
              <Table summary={summary} />
              <Footer />
            </ContextApp.Provider>
          </React.Fragment>
        )
      }
    </div>
  );
};

export default App;
