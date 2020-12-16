import React, { useEffect, useState } from 'react';

import styles from '@/assets/stylesheets/stats.scss';

const Stats = props => {
  const { summary } = props;
  const [totalConfirmed, setTotalConfirmed] = useState(summary.Global.TotalConfirmed);
  const [totalDeaths, setTotalDeaths] = useState(summary.Global.TotalDeaths);
  const [totalRecovered, setTotalRecovered] = useState(summary.Global.TotalRecovered);
  const [newConfirmed, setNewConfirmed] = useState(summary.Global.NewConfirmed);
  const [newDeaths, setNewDeaths] = useState(summary.Global.NewDeaths);
  const [newRecovered, setNewRecovered] = useState(summary.Global.NewRecovered);

  function recalculate() {
    setTotalConfirmed(Math.round(totalConfirmed / 7827));
    setTotalDeaths(Math.round(totalDeaths / 7827));
    setTotalRecovered(Math.round(totalRecovered / 7827));
    setNewConfirmed(Math.round(newConfirmed / 7827));
    setNewDeaths(Math.round(newDeaths / 7827));
    setNewRecovered(Math.round(newRecovered / 7827));
  }

  return (
    <div className={styles['stats-wrapper']}>
      <h2>Global</h2>
      <div className={styles['stats-table']}>
        <div className={styles['stats-global-total-date']}>
          <h3>For all the time</h3>
          <h4>Confirmed</h4>
          <p>
            {totalConfirmed}
          </p>
          <h4>Deaths</h4>
          <p>
            {totalDeaths}
          </p>
          <h4>Recovered</h4>
          <p>
            {totalRecovered}
          </p>
        </div>
        <div className={styles['stats-global-new-date']}>
          <h3>For the last day</h3>
          <h4>Confirmed</h4>
          <p>
            {newConfirmed}
          </p>
          <h4>Deaths</h4>
          <p>
            {newDeaths}
          </p>
          <h4>Recovered</h4>
          <p>
            {newRecovered}
          </p>
        </div>
      </div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={recalculate} className={styles['button-recalculate']}>per 100th population</button>
    </div>
  );
};
export default Stats;
