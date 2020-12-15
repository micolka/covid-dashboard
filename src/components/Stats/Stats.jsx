import React, { useEffect, useState } from 'react';

import { getSummary } from '@/API/API';
import styles from '@/assets/stylesheets/stats.scss';

const Stats = props => {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSummary();
      const countries = await result.Countries[0].Country;
      const countriesDeaths = await result.Countries[0].TotalDeaths;
      setData(result);
      setCountries(countries);
    };

    fetchData();
  }, []);

  return (
    <div className={styles['stats-wrapper']}>
      <h2>Global Deaths</h2>
      <p>
        {data.Global ? data.Global.TotalDeaths : ''}
      </p>
    </div>
  );
};
export default Stats;
