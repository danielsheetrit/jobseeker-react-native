import { StyleSheet } from 'react-native';
import { SIZES, FONT } from '../../constants';

const styles = StyleSheet.create({
  loaderContainer: {
    paddingTop: SIZES.xxLarge,
  },
  alertContainer: {
    width: '100%',
    backgroundColor: '#F7C04A',
    padding: SIZES.medium,
    borderRadius: 8
  },
  alertText: {
    fontFamily: FONT.medium
  }
});

export default styles;
