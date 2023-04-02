import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.medium,
  },
  applyBtn: {
    height: 55,
    width: '100%',
    backgroundColor: '#9354ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});

export default styles;
