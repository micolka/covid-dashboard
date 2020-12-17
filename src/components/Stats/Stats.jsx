import React, { useState } from 'react';

import styles from '@/assets/stylesheets/stats.scss';
import ToggleSwitch from '@/components/Switch/Switch';

import { per100th } from './constants';

const Stats = props => {
  const [checked, setChecked] = useState(false);
  const { summary } = props;
  const [totalConfirmed, setTotalConfirmed] = useState(summary.Global.TotalConfirmed);
  const [totalDeaths, setTotalDeaths] = useState(summary.Global.TotalDeaths);
  const [totalRecovered, setTotalRecovered] = useState(summary.Global.TotalRecovered);
  const [newConfirmed, setNewConfirmed] = useState(summary.Global.NewConfirmed);
  const [newDeaths, setNewDeaths] = useState(summary.Global.NewDeaths);
  const [newRecovered, setNewRecovered] = useState(summary.Global.NewRecovered);

  function recalculate() {
    setTotalConfirmed(Math.round(totalConfirmed / per100th));
    setTotalDeaths(Math.round(totalDeaths / per100th));
    setTotalRecovered(Math.round(totalRecovered / per100th));
    setNewConfirmed(Math.round(newConfirmed / per100th));
    setNewDeaths(Math.round(newDeaths / per100th));
    setNewRecovered(Math.round(newRecovered / per100th));
  }

  const confirmed = checked ? totalConfirmed : newConfirmed;
  const deaths = checked ? totalDeaths : newDeaths;
  const recovered = checked ? totalRecovered : newRecovered;
  const title = checked ? 'For all the time' : 'For one day';

  return (
    <div className={styles['stats-wrapper']}>
      <h2>Global</h2>
      <ToggleSwitch id="toggleSwitch" checked={checked} onChange={setChecked} />
      <div className={styles['stats-table']}>
        <div className={styles['stats-global-total-date']}>
          <h3>{title}</h3>
          <h4>Confirmed</h4>
          <p>
            {confirmed}
          </p>
          <h4>Deaths</h4>
          <p>
            {deaths}
          </p>
          <h4>Recovered</h4>
          <p>
            {recovered}
          </p>
        </div>
      </div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={recalculate} className={styles['button-recalculate']}>per 100th population</button>
    </div>
  );
};
export default Stats;
