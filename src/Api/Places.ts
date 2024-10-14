import {LatLng} from 'react-native-maps';
import type {TPlace, TLocation} from '../Types/Places';
const GOOGLE_PLACES_API = 'AIzaSyBVhxfeN4IYEo1J2TkpLNtPsT72_gI4fuE';

export const getCountriesFromGoogle = async (
  input: string,
): Promise<TPlace[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(regions)&key=${GOOGLE_PLACES_API}`,
    );
    const data = await response.json();
    console.log(data);
    return data.predictions.map((prediction: TPlace) => ({
      description: prediction.description,
      place_id: prediction.place_id,
    }));
  } catch (error) {
    return [
      {
        description: 'Error fetching Google Places API',
        place_id: '',
      },
    ];
  }
};
export const getCitiesForCountry = async (
  countryCode: string,
  input: string,
): Promise<TPlace[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&components=country:${countryCode}&key=${GOOGLE_PLACES_API}`,
    );

    const data = await response.json();

    // Check if predictions are empty
    if (data.predictions.length === 0) {
      console.log("empty")
      return [
        {
          description: 'No result Found',
          place_id: '',
        },
      ];
    }
    return data.predictions.map(
      (prediction: {description: string; place_id: string}) => ({
        description: prediction.description,
        place_id: prediction.place_id,
      }),
    );
  } catch (error) {
    console.error('Error fetching cities from Google Places API:', error);
    return [
      {
        description: 'Error fetching Google Places API',
        place_id: '',
      },
    ];
  }
};
export const getCountryCodeFromPlaceId = async (
  placeId: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API}`,
    );
    const data = await response.json();
    console.log(data);

    const countryComponent = data.result.address_components.find(
      (component: any) => component.types.includes('country'),
    );
    return countryComponent ? countryComponent.short_name : null;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

export const getPlaceCoordinates = async (
  placeId: string,
): Promise<LatLng | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API}`,
    );
    const data = await response.json();
    if (data.status === 'OK') {
      const location = data.result.geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      'Error fetching place details from Google Places API:',
      error,
    );
    return null;
  }
};
