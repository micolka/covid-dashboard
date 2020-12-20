/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import {
  MapContainer, LayerGroup, CircleMarker, TileLayer, Tooltip, useMapEvents,
} from 'react-leaflet';

import styles from '@/assets/stylesheets/map.scss';
import { calcCircleRadius } from '@/components/Map/utils';
import { displayParams } from '@/core/config';
import { ContextApp } from '@/core/reducer';

import { countriesCoords, tileLayerURLs } from './mapConstants';

const Map = props => {
  const { summary } = props;
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = displayParams;
  const [currentParam, setCurrentParam] = useState(TotalConfirmed);
  const [tileLayerParams, setTileLayerParams] = useState(tileLayerURLs[0]);

  const [isLayerChanged, setLayerChanged] = useState(true);
  const [isMenuOpened, setMenuOpened] = useState(false);

  const { state, dispatch } = useContext(ContextApp);
  const fillRedOptions = { fillColor: 'red', stroke: false, fillOpacity: 0.5 };
  const fillCurrentOptions = {
    fillColor: 'red', stroke: true, fillOpacity: 1, color: 'blue', weight: 2,
  };

  function selectCountry(e) {
    const alpha2 = e.originalEvent.path[0].classList[0];
    const countryData = summary.Countries.find(elem => elem.CountryCode === alpha2);
    return countryData;
  }

  function setFillOptions(alpha2) {
    if (state.currentCountry) {
      return state.currentCountry.CountryCode === alpha2 ? fillCurrentOptions : fillRedOptions;
    }
    return fillRedOptions;
  }

  function selectParamToDisplay(e) {
    setCurrentParam(e.target.id);
  }

  function toggleTileSelectorMenu() {
    const map = document.querySelector('.leaflet-container');
    map.classList.toggle('map-container-small');
    setMenuOpened(!isMenuOpened);
  }

  function selectTileLayer(e) {
    const tileLayer = tileLayerURLs.find(layer => layer.name === e.target.id);
    setTileLayerParams(tileLayer);
    toggleTileSelectorMenu();
    setLayerChanged(false);
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        dispatch({
          type: 'SET-CURRENT-COUNTRY',
          payload: selectCountry(e),
        });
      },
    });

    if (state.currentCountry) {
      const coords = countriesCoords
        .find(coordsElem => coordsElem.alpha2 === state.currentCountry.CountryCode);
      const { latitude, longitude } = coords;
      map.flyTo([latitude, longitude], 5);
    }
    return null;
  }

  useEffect(() => {
    setLayerChanged(true);
  });

  return (
    <div className={styles['map-wrapper']}>
      {isLayerChanged && (
      <React.Fragment>
        <MapContainer center={[53.71, 27.95]} zoom={4} scrollWheelZoom>
          <TileLayer
            attribution={`&copy; <a href="${tileLayerParams.href}">${tileLayerParams.name}</a> contributors`}
            url={tileLayerParams.url}
          />
          <LayerGroup>
            {summary.Countries.map(summaryElem => {
              const coords = countriesCoords
                .find(coordsElem => coordsElem.alpha2 === summaryElem.CountryCode);
              if (!coords) return '';
              const {
                latitude, longitude, numeric, alpha2,
              } = coords;
              return (
                <CircleMarker
                  center={[latitude, longitude]}
                  pathOptions={setFillOptions(alpha2)}
                  radius={calcCircleRadius(summaryElem[currentParam])}
                  key={numeric}
                  className={`${alpha2}`}
                >
                  <Tooltip>{`${summaryElem.Country}: ${summaryElem[currentParam]} cases`}</Tooltip>
                </CircleMarker>
              );
            })}
          </LayerGroup>
          <LocationMarker />
        </MapContainer>
      </React.Fragment>
      )}
      <div onClick={selectTileLayer} className={classNames(styles['maps_list-menu'], isMenuOpened ? styles['maps_list-active'] : '')}>
        {isMenuOpened
          ? tileLayerURLs.map(layer => <div id={layer.name} className={styles['layer-selector']} key={layer.name}>{layer.name}</div>)
          : ''}
      </div>
      <div className={styles['map_buttons-wrapper']}>
        <div onClick={selectParamToDisplay} className={styles['map_buttons-params_selector']}>
          <div id={TotalConfirmed} className={classNames(styles.map_button, currentParam === TotalConfirmed ? styles['btn-active'] : '')}>Confirmed</div>
          <div id={TotalDeaths} className={classNames(styles.map_button, currentParam === TotalDeaths ? styles['btn-active'] : '')}>Deaths</div>
          <div id={TotalRecovered} className={classNames(styles.map_button, currentParam === TotalRecovered ? styles['btn-active'] : '')}>Recovered</div>
        </div>
        <div onClick={toggleTileSelectorMenu} className={classNames(styles.map_button, isMenuOpened ? styles['menu_btn-active'] : '')}>Select map</div>
      </div>
    </div>
  );
};

export default Map;
