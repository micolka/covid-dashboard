import React, { useEffect, useState } from 'react';

import styles from '@/assets/stylesheets/table.scss';

const Table = (props) => {
const [numSelector, setNumSelector] = useState(0);

// console.log((props.summary.Countries[0].Country))
// console.log((props.summary.Countries.length))
// console.log((props.summary.Countries))
const sum = props.summary.Countries;
console.log(props.summary.Global)
const an = 'at';
const selectors = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered', 'NewConfirmed', 'NewDeaths', 'NewRecovered',
'TotalConfirmed/100K citizens', 'TotalDeaths/100K citizens', 'TotalRecovered/100K citizens',
 'NewConfirmed/100K citizens', 'NewDeaths/100K citizens', 'NewRecovered/100K citizens'];
 const nameSelector = selectors[numSelector];

 const changeSelector = (e) => {
   if (e.target.closest('button').id === 'next') {
     return setNumSelector (prev => (prev + 1) % 11)
   } else {
     return setNumSelector (prev => {
       if(prev <= 0) return 12 - Math.abs((prev - 1)) % 11;
       return (prev - 1) % 11;
      })
   }
 }

return (
<div className={styles['table-wrapper']}>Countries
  <div>
    <button onClick={changeSelector}>&lt;</button> {nameSelector}<button id='next' onClick={changeSelector}>&gt;</button>
  </div>

  <div className={styles['container']}>
    <div>
    {sum.map((el, id) => <div key={id}> <img src={`https://www.countryflags.io/${el.CountryCode.toLowerCase()}/flat/16.png`}></img> {el.Country} </div>)}
    </div>
    <div>
    {sum.map((el, id) => <div key={id}> {el.TotalConfirmed} </div>)}
    </div>
  </div>
</div>
);




}

export default Table;
