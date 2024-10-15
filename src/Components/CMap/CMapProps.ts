import { LatLng, MapViewProps } from 'react-native-maps';

export interface CMapProps extends MapViewProps {
  [key: string]: any;
  coordinates: LatLng | null;
}
