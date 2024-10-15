import React, { useEffect, useRef } from 'react';
import { CMapProps } from './CMapProps';
import styles from './CMapStyles';
import MapView, { Marker } from 'react-native-maps';
import { initialRegion, zoom } from '../../Constant';

export const CMap = ({ coordinates, ...rest }: CMapProps) => {
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (mapRef.current && coordinates) {
      mapRef.current.animateToRegion(
        {
          ...coordinates,
          ...zoom,
        },
        1000
      );
    }
  }, [coordinates]);

  return (
    <MapView
      zoomControlEnabled
      ref={mapRef}
      style={styles.container}
      provider="google"
      initialRegion={initialRegion}
      {...rest}
    >
      {coordinates ? <Marker coordinate={coordinates}></Marker> : null}
    </MapView>
  );
};
