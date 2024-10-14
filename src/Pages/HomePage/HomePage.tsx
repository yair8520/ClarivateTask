import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { HomePageProps } from './HomePageProps';
import styles from './HomePageStyles';
import { CMap, LocationSearch } from '../../Components';

export const HomePage = ({}: HomePageProps) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(300)).current;

  const toggleHeader = () => {
    const finalHeight = !expanded ? 40 : 300;
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
        <CMap />
      </View>
      <Animated.View style={[styles.header, { height: animation }]}>
        <TouchableOpacity onPress={toggleHeader}>
          <Text style={styles.expendText}>
            {!expanded ? 'Collapse search' : 'Expand search'}
          </Text>
        </TouchableOpacity>
        <LocationSearch />
      </Animated.View>
    </View>
  );
};
