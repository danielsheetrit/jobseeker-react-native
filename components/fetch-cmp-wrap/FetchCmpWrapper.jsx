import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { COLORS } from '../../constants';
import styles from './fetchCmpWrapper.style';

export default function FetchCmpWrapper({ loading, error, children, loaderSize }) {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={loaderSize} color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>Something Went wrong, Try again later.</Text>
      </View>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

FetchCmpWrapper.defaultProps = {
  loaderSize: 'large',
};
