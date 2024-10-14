import React, {useContext} from 'react';
import {LocationSearchProps} from './LocationSearchProps';
import {AutoComplete} from '../AutoComplete';
import {HomeContext} from '../../Context';
import {Button} from 'react-native';
import {getPlaceCoordinates} from '../../Api/Places';

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
    console.log(city, country,!!(city.place_id && country.place_id));
    getPlaceCoordinates(city.place_id).then(coordinates =>
      setCoordinates(coordinates),
    );
  };
  const buttonStatus = !!(city.place_id && country.place_id);
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
        inputProps={{editable: !!country.place_id}}
      />
      <Button disabled={!buttonStatus} title="Go!" onPress={setSelectedPlace} />
    </>
  );
};
