import React, { useEffect, useState } from 'react';
import {
  MapContainer, Marker, Popup, LayerGroup, Circle, TileLayer,
} from 'react-leaflet';

import { getCountriesCoords } from '@/API/API';
import styles from '@/assets/stylesheets/map.scss';

const Map = props => {
  const { summary } = props;
  const [contries, setCountries] = useState('');
  const [isLoading, setLoading] = useState(true);

  const center = [53.71, 27.95];
  const fillRedOptions = { fillColor: 'red' };

  useEffect(() => {
    async function fetchData() {
      const data = await getCountriesCoords();
      setCountries(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) return <div>preloader</div>;

  return (
    <div className={styles['map-wrapper']}>
      <MapContainer center={[53.71, 27.95]} zoom={4} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          <Circle center={center} pathOptions={fillRedOptions} radius={100000} />
        </LayerGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
