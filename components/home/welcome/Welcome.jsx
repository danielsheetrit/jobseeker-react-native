import React, { useState } from 'react';

import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const jobTypes = ['Full-time', 'Part-time', 'Contracor'];

function Welcome({ searchTerm, setSearchTerm, handleSearchNavigate }) {
  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);
  const router = useRouter();

  const handlePress = (item) => {
    setActiveJobType(item);

    if (!searchTerm) return;

    router.push(`/search/${searchTerm + item}`);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Daniel</Text>
        <Text style={styles.welcomeMessage}>Find Your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearchNavigate}>
          <Image style={styles.searchBtnImage} resizeMode="contain" source={icons.search} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          horizontal
          key={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
        />
      </View>
    </View>
  );
}

export default Welcome;
