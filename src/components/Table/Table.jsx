import React, { useState, useContext} from 'react';

import styles from '@/assets/stylesheets/table.scss';
import { selectors } from './Constants';
import { ContextApp } from '@/core/reducer';

const Table = props => {
  const [numSelector, setNumSelector] = useState(0);
  const [value, setValue] = useState('');
  const { state, dispatch } = useContext(ContextApp);

  let sum = props.summary.Countries;
  const nameSelector = selectors[numSelector];
  const per100K = 100000;

  // console.log(sum)

  const changeSelector = e => {
    if (e.target.closest('button').id === 'next') {
      return setNumSelector(prev => (prev + 1) % 12);
    }
    return setNumSelector(prev => {
      if (prev === 0) return 11;
      return (prev - 1) % 12;
    });
  };

  const changeFindInput = e => {
    setValue(e.currentTarget.value);
  };

  if (value.length !== 0) {
    sum = sum.filter(el => el.Country.toUpperCase().startsWith(value.toUpperCase()));
  }

  if (numSelector <= 5) {
    sum.sort((a, b) => b[nameSelector] - a[nameSelector]);
  } else {
    sum.sort((a, b) => (b[selectors[numSelector % 6]] / (b.population * per100K))
    - (a[selectors[numSelector % 6]] / (a.population * per100K)));
  }

  const selectedCountry = e => {
    const countryName = e.target.innerHTML;
    dispatch({
      type: 'SET-CURRENT-COUNTRY',
      payload: sum.find(el => el.Country === countryName)
    });
  };

  return (
    <div className={styles['table-wrapper']}>
      <span>Countries</span>
      <div className={styles.containerSelectors}>
        <button type="button" onClick={changeSelector}>&lt;</button>
        <span className={styles.selectors}>{nameSelector}</span>
        <button type="button" id="next" onClick={changeSelector}>&gt;</button>
      </div>
      <div>
        <span>Find:</span>
        <input className={styles.findArea} onChange={changeFindInput} type="text" value={value} />
      </div>
      <div className={styles.container}>
        <div>
          {sum.map(el => (
            <div key={el.CountryCode}>
              <img className={styles.flagImg} alt="flag" src={`https://www.countryflags.io/${el.CountryCode.toLowerCase()}/flat/16.png`} />
              <span onClick={selectedCountry} className={styles.countries}>{el.Country}</span>
              {numSelector <= 5
                ? <span className={styles.countriesValue}>{el[nameSelector]}</span>
                : <span className={styles.countriesValue}>{(el[selectors[numSelector % 6]] / el.population * per100K).toFixed(3)}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
