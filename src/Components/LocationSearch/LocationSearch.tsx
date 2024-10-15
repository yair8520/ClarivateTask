import React, { useContext } from 'react';
import { LocationSearchProps } from './LocationSearchProps';
import { AutoComplete } from '../AutoComplete';
import { HomeContext } from '../../Context';
import { Alert, Button } from 'react-native';
import { getPlaceCoordinates } from '../../Api/Places';

export const LocationSearch = ({}: LocationSearchProps) => {
  const {
    country,
    city,
    setCity,
    setCountry,
    countryData,
    cityData,
    setCoordinates,
  } = useContext(HomeContext);
  const setSelectedPlace = () => {
    getPlaceCoordinates(city.place_id).then((coordinates) =>
      coordinates ? setCoordinates(coordinates) : Alert.alert('Try Again!')
    );
  };
  const isButtonEnabled = !!(city.place_id && country.place_id);
  return (
    <>
      <AutoComplete
        data={countryData}
        placeholder="Search for a country"
        onChange={setCountry}
        value={country.description}
      />
      <AutoComplete
        data={cityData}
        placeholder="Search for a city"
        onChange={setCity}
        value={city.description}
        inputProps={{ editable: !!country.place_id }}
      />
      <Button
        disabled={!isButtonEnabled}
        title="Go!"
        onPress={setSelectedPlace}
      />
    </>
  );
};
