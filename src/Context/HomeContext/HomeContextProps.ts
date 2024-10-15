import type { TPlace } from '../../Types/Places';
import type { LatLng } from 'react-native-maps';

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
  cityData: TPlace[];
  countryData: TPlace[];
  setCountry: React.Dispatch<React.SetStateAction<TPlace>>;
  setCoordinates: React.Dispatch<React.SetStateAction<LatLng | null>>;
  setCity: React.Dispatch<React.SetStateAction<TPlace>>;
  setCityData: React.Dispatch<React.SetStateAction<TPlace[]>>;
  setCountryData: React.Dispatch<React.SetStateAction<TPlace[]>>;
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
