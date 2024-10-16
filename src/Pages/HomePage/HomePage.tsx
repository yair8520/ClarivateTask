import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { HomePageProps } from './HomePageProps';
import styles from './HomePageStyles';
import { CMap, LocationSearch } from '../../Components';
import { homeHeader } from '../../Constant';
import { HomeContext } from '../../Context';
const { close, open } = homeHeader;

export const HomePage = ({}: HomePageProps) => {
  const { coordinates } = useContext(HomeContext);
  const [expanded, setExpanded] = useState(false);

  const animation = useRef(new Animated.Value(open)).current;
  const toggleHeader = () => {
    const finalHeight = !expanded ? close : open;
    Animated.timing(animation, {
      toValue: finalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <CMap coordinates={coordinates} />
      </View>
      <Animated.View style={[styles.header, { height: animation }]}>
        <TouchableOpacity onPress={toggleHeader}>
          <Text style={styles.expendText}>{!expanded ? '▲' : '▼'}search</Text>
        </TouchableOpacity>
        <LocationSearch onNavigate={toggleHeader} />
      </Animated.View>
    </View>
  );
};
