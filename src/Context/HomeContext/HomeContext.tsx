import React, { createContext, useRef, useState, useCallback } from 'react';
import {
  HomeContextInterface,
  HomeContextProps,
  InitialHomeContext,
  initialPlace,
} from './HomeContextProps';
import { useDebouncedEffect } from '../../Hooks';
import {
  getCitiesForCountry,
  getCountriesFromGoogle,
  getCountryCodeFromPlaceId,
} from '../../Api/Places';
import type { TPlace } from '../../Types/Places';
import type { LatLng } from 'react-native-maps';

export const HomeContext =
  createContext<HomeContextInterface>(InitialHomeContext);

export const HomeProvider = ({ children }: HomeContextProps) => {
  const [country, setCountry] = useState<TPlace>(initialPlace);
  const [coordinates, setCoordinates] = useState<LatLng | null>(null);
  const [city, setCity] = useState<TPlace>(initialPlace);
  const [cityData, setCityData] = useState<TPlace[]>([]);
  const [countryData, setCountryData] = useState<TPlace[]>([]);
  const countryCode = useRef<string>('');

  useDebouncedEffect(
    () => {
      resetCountryData();
      fetchCountries();
    },
    [country],
    500
  );

  useDebouncedEffect(
    () => {
      fetchCities();
    },
    [city],
    500
  );

  const resetCountryData = () => {
    setCityData([]);
    setCountryData([]);
    setCity(initialPlace);
  };

  const fetchCountries = useCallback(async () => {
    countryCode.current = '';
    try {
      const countries = await getCountriesFromGoogle(country.description);
      console.log({countries})
      if (countries.length > 0) setCountryData(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }, [country.description]);

  const fetchCities = useCallback(async () => {
    const { description: countryDescription, place_id } = country;
    const { description: cityDescription } = city;

    if (!countryDescription || cityDescription.length === 0) return;

    const code = await getCountryCodeFromPlaceId(place_id);
    countryCode.current = code ?? '';
    const cities = await getCitiesForCountry(
      countryCode.current,
      cityDescription
    );
    console.log({ cities });
    setCityData(cities);
  }, [country, city]);

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
