import React, { useState } from 'react';

import styles from '@/assets/stylesheets/stats.scss';
import ToggleSwitch from '@/components/Switch/Switch';

import { per100th } from './constants';

const Stats = props => {
  const [checked, setChecked] = useState(false);
  const { summary } = props;
  const totalConfirmed = summary.Global.TotalConfirmed;
  const totalDeaths = summary.Global.TotalDeaths;
  const totalRecovered = summary.Global.TotalRecovered;
  const newConfirmed = summary.Global.NewConfirmed;
  const newDeaths = summary.Global.NewDeaths;
  const newRecovered = summary.Global.NewRecovered;

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

  return (
    <div className={styles['stats-wrapper']}>
      <h2>Global</h2>
      <ToggleSwitch id="toggleSwitch" checked={checked} onChange={setChecked} />
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
      <button type="button" onClick={handleClick} className={styles['button-recalculate']}>
        {buttonText}
      </button>
    </div>
  );
};
export default Stats;
