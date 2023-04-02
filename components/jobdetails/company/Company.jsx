import { View, Text, Image } from 'react-native';

import styles from './company.style';
import { icons } from '../../../constants';

function Company({ companyLogo, jobTitle, companyName, location }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image style={styles.logoImage} resizeMode="contain" source={{ uri: companyLogo }} />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.locationBox}>
        <View style={styles.companyInfoBox}>
          <Text style={styles.companyName}>{companyName} / </Text>
        </View>
        <Image source={icons.location} resizeMode="contain" style={styles.locationImage} />
        <Text style={styles.locationName}>{location}</Text>
      </View>
    </View>
  );
}

export default Company;
