import React, { useState, useContext } from 'react';

import styles from '@/assets/stylesheets/stats.scss';
import ToggleSwitch from '@/components/Switch/Switch';
import { ContextApp } from '@/core/reducer';

import { per100th } from '../../core/config';

const Stats = props => {
  const [checked, setChecked] = useState(false);
  const { summary } = props;
  const { state, dispatch } = useContext(ContextApp);
  const curCountry = state.currentCountry || {};
  const global = summary.Global || {};
  const countryCode = curCountry.CountryCode || '';
  const country = curCountry.Country || 'Global';
  const totalConfirmed = curCountry.TotalConfirmed || global.TotalConfirmed;
  const totalDeaths = curCountry.TotalDeaths || global.TotalDeaths;
  const totalRecovered = curCountry.TotalRecovered || global.TotalRecovered;
  const newConfirmed = curCountry.NewConfirmed || global.NewConfirmed;
  const newDeaths = curCountry.NewDeaths || global.NewDeaths;
  const newRecovered = curCountry.NewRecovered || global.NewRecovered;

  function recalculatePer100th(digit) {
    return Math.round(digit / per100th);
  }

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
    dispatch({
      type: 'SET-PER100K-STATS',
    });
  };
  let confirmed = checked ? totalConfirmed : newConfirmed;
  let deaths = checked ? totalDeaths : newDeaths;
  let recovered = checked ? totalRecovered : newRecovered;
  const title = checked ? 'For all time' : 'For one day';
  const population = show ? 'Per 100000 population' : 'For all people';

  if (show) {
    confirmed = recalculatePer100th(confirmed);
    deaths = recalculatePer100th(deaths);
    recovered = recalculatePer100th(recovered);
  }
  const flag = countryCode ? (<img className={styles['stats-flag-img']} alt="flag" src={`https://www.countryflags.io/${countryCode.toLowerCase()}/flat/16.png`} />) : '';

  return (
    <div className={styles['stats-wrapper']}>
      <div className={styles['stats-main-title']}>
        {flag}
        <h2 className={styles['stats-country']}>{country}</h2>
      </div>
      <div className={styles['stats-table']}>
        <h3 className={styles['stats-data-title']}>
          Confirmed:
          <span className={styles['stats-data-confirmed']}>{confirmed}</span>
        </h3>
        <h3 className={styles['stats-data-title']}>
          Deaths:

          <span className={styles['stats-data-deaths']}>{deaths}</span>
        </h3>
        <h3 className={styles['stats-data-title']}>
          Recovered:
          <span className={styles['stats-data-recovered']}>{recovered}</span>
        </h3>
      </div>
      <div className={styles['stats-toggle-container']}>
        <h4 className={styles['stats-title']}>{title}</h4>
        <ToggleSwitch id="toggleSwitch" checked={checked} onChange={setChecked} />
      </div>
      <div className={styles['stats-toggle-container']}>
        <h4>{population}</h4>
        <ToggleSwitch id="per100k" checked={show} onChange={handleClick} />
      </div>
    </div>
  );
};
export default Stats;
