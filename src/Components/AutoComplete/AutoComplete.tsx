import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AutoCompleteProps } from './AutoCompleteProps';
import styles from './AutoCompleteStyles';
import type { TPlace } from '../../Types/Places';

export const AutoComplete = ({
  data,
  placeholder,
  onChange,
  value,
  inputProps,
}: AutoCompleteProps) => {
  const [filteredData, setFilteredData] = useState<TPlace[]>([]);
  console.log(data)
  const filterData = (text: string) => {
    onChange({ description: text, place_id: '' });
    if (!text) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((item) =>
      item.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered.length > 0 ? filtered : data);
  };

  const handleItemSelect = (item: TPlace) => {
    onChange(item);
    setFilteredData([]);
  };
  const displayDropDown = filteredData.length > 0 && value;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={filterData}
        {...inputProps}
      />
      {displayDropDown && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleItemSelect(item)}
              >
                <Text style={styles.itemText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.contentStyle}
            style={styles.list}
          />
        </View>
      )}
    </View>
  );
};
