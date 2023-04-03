import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { SIZES } from '../../../constants';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import FetchCmpWrapper from '../../fetch-cmp-wrap/FetchCmpWrapper';

function Popularjobs({ data, loading, error }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>

        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FetchCmpWrapper loading={loading} error={error}>
          <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        </FetchCmpWrapper>
      </View>
    </View>
  );
}

export default Popularjobs;
