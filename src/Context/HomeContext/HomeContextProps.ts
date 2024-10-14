import {DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES} from 'react';
import {TPlace} from '../../Types/Places';
import {LatLng} from 'react-native-maps';

export interface HomeContextProps {
  [key: string]: any;
}
export const initialPlace = {
  description: '',
  place_id: '',
};

export interface HomeContextInterface {
  country: TPlace;
  city: TPlace;
  coordinates: LatLng | null;
  cityData: any[]; // Array of cities
  countryData: any[]; // Array of countries
  setCountry: React.Dispatch<React.SetStateAction<TPlace>>;
  setCoordinates: React.Dispatch<React.SetStateAction<LatLng | null>>;
  setCity: React.Dispatch<React.SetStateAction<TPlace>>;
  setCityData: React.Dispatch<React.SetStateAction<any[]>>;
  setCountryData: React.Dispatch<React.SetStateAction<any[]>>;
}
export const InitialHomeContext: HomeContextInterface = {
  coordinates: null,
  city: initialPlace,
  country: initialPlace,
  cityData: [],
  countryData: [],
  setCity: () => {},
  setCountry: () => {},
  setCoordinates: () => {},
  setCityData: () => {},
  setCountryData: () => {},
};
