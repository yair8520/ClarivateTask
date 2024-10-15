import { StyleSheet } from 'react-native';

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

    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    zIndex: 80,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 158,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  list: {
    flexGrow: 1,
  },
  contentStyle: {
    flexGrow: 1,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 50,
    backgroundColor: '#f8f8f8',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemHighlighted: {
    backgroundColor: '#e0e0e0',
  },
});
