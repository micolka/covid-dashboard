import React, { useEffect, useState } from 'react';
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';

import { getWorldTotalWIP } from '@/API/API';
import styles from '@/assets/stylesheets/map.scss';

const Map = (props) => {
  const initialState = { TotalConfirmed: 0, TotalDeaths: 0, TotalRecovered: 0 };
  const [worldTotal, setWordTotal] = useState(initialState);
  const { summary } = props;
  useEffect(() => {
    async function fetchData() {
      const data = await getWorldTotalWIP();
      setWordTotal(data);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  return (
    <div className={styles['map-wrapper']}>
      <div id="mapid" className={styles['map-container']}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup.
              {' '}
              <br />
              {' '}
              Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
