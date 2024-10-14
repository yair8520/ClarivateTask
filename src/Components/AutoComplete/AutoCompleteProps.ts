// AutoCompleteProps.ts

import {TextInputProps} from 'react-native';
import {TPlace} from '../../Types/Places';

export interface AutoCompleteProps {
  data: TPlace[];
  placeholder?: string;
  onChange: (item: TPlace) => void;
  value: string;
  inputProps?: TextInputProps;
}
