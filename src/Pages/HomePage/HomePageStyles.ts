import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    top: 0,
    zIndex: 150,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    zIndex: 1,
  },
  expendText: {
    fontSize: 20,
  },
});
