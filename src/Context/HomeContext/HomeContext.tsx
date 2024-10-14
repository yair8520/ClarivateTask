import React, {createContext, useRef, useState} from 'react';
import {
  HomeContextInterface,
  HomeContextProps,
  InitialHomeContext,
  initialPlace,
} from './HomeContextProps';
import {useDebouncedEffect} from '../../Hooks';
import {
  getCitiesForCountry,
  getCountriesFromGoogle,
  getCountryCodeFromPlaceId,
} from '../../Api/Places';
import type {TPlace} from '../../Types/Places';
import {LatLng} from 'react-native-maps';

export const HomeContext =
  createContext<HomeContextInterface>(InitialHomeContext);

export const HomeProvider = ({children}: HomeContextProps) => {
  const [country, setCountry] = useState<TPlace>(initialPlace);
  const [coordinates, setCoordinates] = useState<LatLng | null>(null);
  const [city, setCity] = useState<TPlace>(initialPlace);
  const [cityData, setCityData] = useState<TPlace[]>([]);
  const [countryData, setCountryData] = useState<TPlace[]>([]);
  const countryCode = useRef('');
  const onResetCountry = () => {
    setCityData([]);
    setCountryData([]);
    setCity(initialPlace);
  };
  useDebouncedEffect(
    () => {
      onResetCountry();
      if (country.description) {
        countryCode.current = '';
        getCountriesFromGoogle(country.description).then(c =>
          setCountryData(c),
        );
      }
    },
    [country],
    500,
  );
  useDebouncedEffect(
    async () => {
      const {description: countryDescription, place_id} = country;
      const {description: cityDescription} = city;

      if (!countryDescription || cityDescription.length === 0) return;

      const code = await getCountryCodeFromPlaceId(place_id);
      countryCode.current = code ?? '';
      const cities = await getCitiesForCountry(
        countryCode.current,
        cityDescription,
      );
      setCityData(cities);
    },
    [city],
    500,
  );

  return (
    <HomeContext.Provider
      value={{
        country,
        city,
        setCountry,
        setCity,
        cityData,
        countryData,
        setCityData,
        setCountryData,
        coordinates,
        setCoordinates,
      }}>
      {children}
    </HomeContext.Provider>
  );
};
