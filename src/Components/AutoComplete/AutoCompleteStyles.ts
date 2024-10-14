import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    position: 'relative',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 60,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 158,
  },
  list: {
    flexGrow: 1,
   
  },
  contentStyle: {
    flexGrow: 1,
    borderRadius: 25,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 50,
  },
  itemText: {
    fontSize: 16,
  },
});
