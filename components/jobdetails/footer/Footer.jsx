import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import styles from './footer.style';

function Footer({ url }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for this job</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
