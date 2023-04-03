import { StyleSheet } from 'react-native';
import { FONT } from '../../constants';

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9354ff',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatIcon: {
    width: '50%',
    height: '50%',
    tintColor: 'white',
  },
  exitButton: {
    position: 'absolute',
    height: 36,
    width: 36,
    top: 10,
    right: 15,
    backgroundColor: 'gray',
    padding: 4,
    borderRadius: 12,
  },
  exitIcon: {
    height: '100%',
    width: '100%',
    tintColor: '#333',
  },
  chatbotTitle: {
    fontFamily: FONT.bold,
    fontSize: 16,
  },
  loader: {
    position: 'absolute',
    top: 19,
    left: 25,
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '80%',
    padding: 12,
    marginTop: 'auto',
    backgroundColor: '#ebebeb',
    borderTopLeftRadius: 27.5,
    borderTopRightRadius: 27.5,
    // box shadow
    shadowColor: '#444',
    shadowRadius: 20,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 10,
  },
  inputField: (isKeyboardOpen) => ({
    shadowColor: '#0084ff',
    shadowRadius: 10,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 10,
    height: 40,
    borderRadius: 12,
    position: 'absolute',
    bottom: isKeyboardOpen ? 290 : 20,
    elevation: 10,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    padding: 8,
  }),
});

export default styles;
