import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
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
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const onChangeText = (text: string) => {
    onChange({ description: text, place_id: '' });
    setDropdownVisible(text.length > 0);
  };

  const handleItemSelect = (item: TPlace) => {
    setDropdownVisible(false);
    Keyboard.dismiss();
    if (!item.place_id) return;
    onChange(item);
  };

  const displayDropDown = isDropdownVisible && data.length > 0;

  return (
    <View style={styles.container}>
      <TextInput
        onBlur={() => setDropdownVisible(false)}
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...inputProps}
      />
      {displayDropDown && (
        <View style={styles.dropdown}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={data}
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
