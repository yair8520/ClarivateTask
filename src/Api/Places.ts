import { LatLng } from 'react-native-maps';
import type { TPlace } from '../Types/Places';
import { GOOGLE_PLACES_API } from '@env';
const emptyRes = [
  {
    description: 'No result found',
    place_id: '',
  },
];
// Helper function for making API requests
const fetchFromGoogle = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching from Google API: ${error}`);
    return null;
  }
};

// Fetch country data based on input
export const getCountriesFromGoogle = async (
  input: string
): Promise<TPlace[]> => {
  if (input.length < 3) {
    return [];
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=country&key=${GOOGLE_PLACES_API}`;
  const data = await fetchFromGoogle(url);
  console.log("here",data)

  if (data?.predictions.length) {
    return data.predictions.map((prediction: TPlace) => ({
      description: prediction.description,
      place_id: prediction.place_id,
    }));
  }

  return emptyRes;
};

// Fetch cities based on country code and input
export const getCitiesForCountry = async (
  countryCode: string,
  input: string
): Promise<TPlace[]> => {
  if (input.length < 3) {
    return [];
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&components=country:${countryCode}&key=${GOOGLE_PLACES_API}`;
  const data = await fetchFromGoogle(url);

  if (data?.predictions?.length) {
    return data.predictions.map(
      (prediction: { description: string; place_id: string }) => ({
        description: prediction.description,
        place_id: prediction.place_id,
      })
    );
  }

  return emptyRes;
};

// Fetch country code based on place ID
export const getCountryCodeFromPlaceId = async (
  placeId: string
): Promise<string | null> => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API}`;
  const data = await fetchFromGoogle(url);

  if (data?.result?.address_components) {
    const countryComponent = data.result.address_components.find(
      (component: any) => component.types.includes('country')
    );
    return countryComponent ? countryComponent.short_name : null;
  }
  return null;
};

// Fetch place coordinates based on place ID
export const getPlaceCoordinates = async (
  placeId: string
): Promise<LatLng | null> => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API}`;
  const data = await fetchFromGoogle(url);

  if (data?.result?.geometry?.location) {
    const location = data.result.geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  }
  return null;
};
