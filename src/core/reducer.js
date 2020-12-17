import React from 'react';

export const ContextApp = React.createContext();

export const initialReducerState = {
  currentCountry: null,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET-CURRENT-COUNTRY':
      return {
        ...state,
        currentCountry: action.payload,
      };
    default:
      return state;
  }
};
