/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import classNames from 'classnames';
import React, { useRef, useState, useEffect, useContext } from 'react';

import styles from '@/assets/stylesheets/table.scss';
import { ContextApp } from '@/core/reducer';

import { selectors } from './Constants';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
// import { Keyboard } from './keyboard';

const Table = props => {
  const [numSelector, setNumSelector] = useState(0);
  const [value, setValue] = useState('');
  const { state, dispatch } = useContext(ContextApp);
  const {
    statsF, graphF, mapF, tableF,
  } = state.fullscreen;
  let sum = props.summary.Countries;
  const nameSelector = selectors[numSelector];
  const per100K = 100000;

  const onChange = input => {
    setValue(e.currentTarget.value);
    // setInput(input);
    console.log("Input changed", input);
  };
  // const [input, setInput] = useState('');
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  // const onChangeInput = event => {
  //   const input = event.target.value;
  //   setInput(input);
  //   keyboard.current.setInput(input);
  // };



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
    keyboard.current.setInput(e.currentTarget.value);
  };

  if (value.length !== 0) {
    sum = sum.filter(el => el.Country.toUpperCase().startsWith(value.toUpperCase()));
  }

  if (numSelector <= 5) {
    sum.sort((a, b) => b[nameSelector] - a[nameSelector]);
  } else {
    sum.sort((a, b) => (b[selectors[numSelector % 6]] / b.population * per100K)
    - (a[selectors[numSelector % 6]] / a.population * per100K));
  }

  const selectedCountry = e => {
    const countryName = e.target.closest('#countryWrapper').children[0].children[1].innerHTML;
    dispatch({
      type: 'SET-CURRENT-COUNTRY',
      payload: sum.find(el => el.Country === countryName),
    });
  };

  function toggleFullScreen() {
    dispatch({
      type: 'TOGGLE-FULLSCREEN-MODE',
      payload: { tableF: !state.fullscreen.tableF },
    });
  }

  // useEffect(() => {
  //   Keyboard.init();
  // }, []);

  return (
    <div className={classNames(styles['table-wrapper'], (graphF || statsF || mapF) ? styles['hide-table'] : '')}>
      <div className={styles['fullscreen-container_wrapper']}>
        <div onClick={toggleFullScreen} className={styles.fullScreenButton}>
          <i className="material-icons">{tableF ? 'fullscreen_exit' : 'fullscreen'}</i>
        </div>
        <span className={styles.countryHeader}>Countries</span>
        <div className={styles.containerSelectors}>
          <button type="button" className={styles.butNextCointry} onClick={changeSelector}><ArrowLeftIcon /></button>
          <span className={styles.selectors}>{nameSelector}</span>
          <button type="button" id="next" className={styles.butNextCointry} onClick={changeSelector}><ArrowRightIcon /></button>
        </div>
        <div>
          <span>Search: </span>
          <input className={styles.findArea} id="keyboard" onChange={changeFindInput} type="text" value={value} />
        </div>
        <div className={styles.container}>
          <div>
            {sum.map(el => (
              <div onClick={selectedCountry} id="countryWrapper" className={styles.coutrywrap} key={el.CountryCode}>
                <div>
                  <img className={styles.flagImg} alt="flag" src={`https://www.countryflags.io/${el.CountryCode.toLowerCase()}/flat/16.png`} />
                  <span className={styles.countries}>{el.Country}</span>
                </div>
                {numSelector <= 5
                  ? <span className={styles.countriesValue}>{el[nameSelector]}</span>
                  : <span className={styles.countriesValue}>{(el[selectors[numSelector % 6]] / el.population * per100K).toFixed(3)}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Keyboard
        id='keyb'
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default Table;
