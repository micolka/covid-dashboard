import React, { useState, useContext } from 'react';

import styles from '@/assets/stylesheets/stats.scss';
import ToggleSwitch from '@/components/Switch/Switch';
import { ContextApp } from '@/core/reducer';

import { per100th } from './constants';

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
  };

  let confirmed = checked ? totalConfirmed : newConfirmed;
  let deaths = checked ? totalDeaths : newDeaths;
  let recovered = checked ? totalRecovered : newRecovered;
  let buttonText = 'per 100 th';
  const title = checked ? 'For all the time' : 'For one day';

  if (show) {
    confirmed = recalculatePer100th(confirmed);
    deaths = recalculatePer100th(deaths);
    recovered = recalculatePer100th(recovered);
    buttonText = 'for all';
  }
  const flag = countryCode ? (<img className={styles['stats-flag-img']} alt="flag" src={`https://www.countryflags.io/${countryCode.toLowerCase()}/flat/16.png`} />) : '';

  return (
    <div className={styles['stats-wrapper']}>
      <div className={styles['stats-main-title']}>
        <h2 className={styles['stats-country']}>{country}</h2>
        {flag}
      </div>
      <div className={styles['stats-table']}>
        <div className={styles['stats-date-container']}>
          <h3 className={styles['stats-title']}>{title}</h3>
          <h4 className={styles['stats-data-title']}>
            Confirmed:
            <span className={styles['stats-data']}>{confirmed}</span>
          </h4>
          <h4 className={styles['stats-data-title']}>
            Deaths:
            <span className={styles['stats-data']}>{deaths}</span>
          </h4>
          <h4 className={styles['stats-data-title']}>
            Recovered:
            <span className={styles['stats-data']}>{recovered}</span>
          </h4>
        </div>
      </div>
      <ToggleSwitch id="toggleSwitch" checked={checked} onChange={setChecked} />
      <button type="button" onClick={handleClick} className={styles['button-recalculate']}>
        {buttonText}
      </button>
    </div>
  );
};
export default Stats;
