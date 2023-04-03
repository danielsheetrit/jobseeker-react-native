import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: (isKeyboardOpen) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 55,
    backgroundColor: 'transparent',
    height: isKeyboardOpen ? '40%' : '82.5%',
    paddingLeft: 10,
    paddingRight: 10,
  }),
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  assistant: {
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-start',
  },
  user: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
    color: '#fff',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default styles;
