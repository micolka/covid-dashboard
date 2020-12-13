import React, { useEffect, useState } from 'react';

import { getWorldTotalWIP } from '@/API/API';
import { TSummary, WorldTotalWIP } from '@/API/APITypes';
import styles from '@/assets/stylesheets/map.scss';

type PropsType = {
  summary: TSummary;
};

const Map = (props: PropsType): JSX.Element => {
  const initialState: WorldTotalWIP = { TotalConfirmed: 0, TotalDeaths: 0, TotalRecovered: 0 };
  const [worldTotal, setWordTotal] = useState(initialState);
  const { summary } = props;
  useEffect(() => {
    async function fetchData(): Promise<void> {
      const data = await getWorldTotalWIP();
      setWordTotal(data);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  return (
    <div className={styles['map-wrapper']}>
      {`Map ${worldTotal.TotalRecovered} container${summary.Date}`}
    </div>
  );
};

export default Map;
