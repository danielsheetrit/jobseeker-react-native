import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
// import { useFetch } from '../../../hooks';
import FetchCmpWrapper from '../../fetch-cmp-wrap/FetchCmpWrapper';
import data from '../popular/data';

function Nearbyjobs() {
  const router = useRouter();

  // const { data, loading, error } = useFetch('search', {
  //   query: 'React Developer',
  //   num_pages: 1,
  // });

  const loading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>

        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FetchCmpWrapper loading={loading} error={error}>
          {data?.map((job) => (
            <NearbyJobCard
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              job={job}
              key={`nearby-job-${job?.job_id}`}
            />
          ))}
        </FetchCmpWrapper>
      </View>
    </View>
  );
}

export default Nearbyjobs;
