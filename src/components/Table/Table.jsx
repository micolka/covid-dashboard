import React, { useEffect, useState } from 'react';

import { selectors } from './Constants';
import styles from '@/assets/stylesheets/table.scss';

const Table = (props) => {
const [numSelector, setNumSelector] = useState(0);
const [value, Setvalue] = useState('');

let sum = props.summary.Countries;
const population = props.summary.population;
// console.log(population)
 const nameSelector = selectors[numSelector];

// console.log(sum)

 const changeSelector = (e) => {
   if (e.target.closest('button').id === 'next') {
     return setNumSelector (prev => (prev + 1) % 12)
   } else {
     return setNumSelector (prev => {
       if(prev <= 0) return 12 - Math.abs((prev - 1)) % 12;
       return (prev - 1) % 12;
      })
   }
 }

const changeFindInput = (e) => {
  Setvalue(e.currentTarget.value)
}

if (value.length !== 0) {
  sum = sum.filter((el) => el.Country.startsWith(value))
}

// console.log(population[0].population)

 if(numSelector <= 5) {
  sum.sort((a,b) => b[nameSelector] - a[nameSelector]);
 } else {
  sum.sort((a,b) => b[selectors[numSelector % 6]] - a[selectors[numSelector % 6]]);
  // sum.sort((a,b) => (b[nameSelector] / (population.find(item => item.name == b.Country)).population) * 100000 -
  //  (a[nameSelector] / (population.find(item => item.name == a.Country)).population) * 100000);

  return (
    <div className={styles['table-wrapper']}><span>Countries</span>
  <div className={styles['containerSelectors']}>
    <button onClick={changeSelector}>&lt;</button> <span className={styles['selectors']}>{nameSelector}</span><button id='next' onClick={changeSelector}>&gt;</button>
  </div>
  <div><span>Find:</span><input className={styles['findArea']} onChange={changeFindInput} type="text" value={value}/></div>
  <div className={styles['container']}>
    <div>
    {sum.map((el, id) => <div key={id}> <img className={styles['flagImg']} src={`https://www.countryflags.io/${el.CountryCode.toLowerCase()}/flat/16.png`}></img>
     <span className={styles['countries']}>{el.Country}</span><span className={styles['countriesValue']}>{el[selectors[numSelector % 6]]}</span> </div>)}
    </div>
  </div>
</div>
  );
 }

return (
<div className={styles['table-wrapper']}> <span>Countries</span>
  <div className={styles['containerSelectors']}>
    <button onClick={changeSelector}>&lt;</button> <span className={styles['selectors']}>{nameSelector}</span><button id='next' onClick={changeSelector}>&gt;</button>
  </div>
  <div><span>Find:</span><input className={styles['findArea']} onChange={changeFindInput} type="text" value={value}/></div>
  <div className={styles['container']}>
    <div>
    {sum.map((el, id) => <div key={id}> <img className={styles['flagImg']}src={`https://www.countryflags.io/${el.CountryCode.toLowerCase()}/flat/16.png`}></img>
    <span className={styles['countries']}>{el.Country}</span><span className={styles['countriesValue']}>{el[nameSelector]}</span> </div>)}
    </div>
  </div>
</div>
);

}

export default Table;
