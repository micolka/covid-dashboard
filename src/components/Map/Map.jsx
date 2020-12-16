import React, { useEffect, useState } from 'react';
import {
  MapContainer, LayerGroup, CircleMarker, TileLayer, Tooltip,
} from 'react-leaflet';

import { getCountriesCoords } from '@/API/API';
import styles from '@/assets/stylesheets/map.scss';
import { calcCircleRadius } from '@/components/Map/utils';

const Map = props => {
  const { summary } = props;
  const [countriesCoords, setCountriesCoords] = useState('');
  const [isLoading, setLoading] = useState(true);
  const fillRedOptions = { fillColor: 'red', stroke: false, fillOpacity: 0.5 };

  useEffect(() => {
    async function fetchData() {
      const data = await getCountriesCoords();
      setCountriesCoords(data);
      setLoading(false);
    }
    if (isLoading) fetchData();
  }, [isLoading]);

  if (isLoading) return <div>preloader</div>;

  return (
    <div className={styles['map-wrapper']}>
      <MapContainer center={[53.71, 27.95]} zoom={4} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          {summary.Countries.map(summaryElem => {
            const coords = countriesCoords
              .find(coordsElem => coordsElem.alpha2 === summaryElem.CountryCode);
            if (!coords) return '';
            const { latitude, longitude, numeric } = coords;
            return (
              <CircleMarker
                center={[latitude, longitude]}
                pathOptions={fillRedOptions}
                radius={calcCircleRadius(summaryElem.TotalConfirmed)}
                key={numeric}
              >
                <Tooltip>{`${summaryElem.Country}: ${summaryElem.TotalConfirmed}`}</Tooltip>
              </CircleMarker>
            );
          })}
        </LayerGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
