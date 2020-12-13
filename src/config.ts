import { TSummary } from './API/APITypes';

export const appInitialState: TSummary = {
  Message: '',
  Global: {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
  },
  Countries: [],
  Date: '',
};

export const anotherConst = '';
