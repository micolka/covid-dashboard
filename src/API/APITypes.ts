/* eslint-disable camelcase */
export type TGlobal = {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
};

type TCountries = {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
  Premium: unknown;
};

export type TSummary = {
  Message: string;
  Date: string;
  Global: TGlobal;
  Countries: TCountries[];
};

export type TCountry = {
  Country: string;
  Slug: string;
  ISO2: string;
};

export type TDayOne = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
};

export type TAllStatus = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
};

export type TWorldTotalWIP = {
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type TPopulation = {
  name: string;
  population: number;
  alpha2Code: string;
};

export type TTimeline = {
  last_update: string;
  total_cases: number;
  total_deaths: number;
  total_recovered: number;
};
