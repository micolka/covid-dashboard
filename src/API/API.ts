import {
  TCountry, TAllStatus, TSummary, TGlobal, WorldTotalWIP, TCountryCoords,
} from './APITypes';

export const API = {
  URL: 'https://api.covid19api.com',
  URL1: 'https://covid19-api.org/api',
  ENDPOINTS: {
    ALL: 'all',
    DATE: 'date',
    CONFIRMED: 'confirmed',
    COUNTRIES: 'countries',
    COUNTRY: 'country',
    DAYONE: 'dayone',
    LIVE: 'live',
    SUMMARY: 'summary',
    STATUS: 'status',
    TOTAL: 'total',
    WORLD: 'world',
  },
};

export const getCountries = async (): Promise<TCountry[]> => {
  const { URL, ENDPOINTS } = API;
  const response = await fetch(`${URL}/${ENDPOINTS.COUNTRIES}`);
  return (await response.json()) as TCountry[];
};

export const getCountriesCoords = async (): Promise<TCountryCoords[]> => {
  const { URL1, ENDPOINTS } = API;
  const response = await fetch(`${URL1}/${ENDPOINTS.COUNTRIES}`);
  return (await response.json()) as TCountryCoords[];
};

export const getSummary = async (): Promise<TSummary> => {
  const { URL, ENDPOINTS } = API;
  const response = await fetch(`${URL}/${ENDPOINTS.SUMMARY}`);
  return (await response.json()) as TSummary;
};

export const getDayOneTotalAllStatus = async (name: string): Promise<TAllStatus[]> => {
  const { URL, ENDPOINTS } = API;
  const { DAYONE, COUNTRY, TOTAL } = ENDPOINTS;

  const response = await fetch(`${URL}/${TOTAL}/${DAYONE}/${COUNTRY}/${name}`);
  return (await response.json()) as TAllStatus[];
};

export const getByCountryAllStatus = async (
  name: string,
  from: string,
  to: string
): Promise<TAllStatus[]> => {
  const { URL, ENDPOINTS } = API;
  const { COUNTRY } = ENDPOINTS;

  const response = await fetch(`${URL}/${COUNTRY}/${name}?from=${from}&to=${to}`);
  return (await response.json()) as TAllStatus[];
};

export const getWorldWIP = async (from: string, to: string): Promise<TGlobal[]> => {
  const { URL, ENDPOINTS } = API;
  const { WORLD } = ENDPOINTS;

  const response = await fetch(`${URL}/${WORLD}?from=${from}&to=${to}`);
  return (await response.json()) as TGlobal[];
};

export const getWorldTotalWIP = async (): Promise<WorldTotalWIP> => {
  const { URL, ENDPOINTS } = API;
  const { WORLD, TOTAL } = ENDPOINTS;

  const response = await fetch(`${URL}/${WORLD}/${TOTAL}`);
  return (await response.json()) as WorldTotalWIP;
};
