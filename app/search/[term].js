import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import { useFetch } from '../../hooks';
import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search';

function JobSearch() {
  const [page, setPage] = useState(1);

  const router = useRouter();
  const { term } = useSearchParams();

  const { data, loading, error, refetch } = useFetch('search', {
    query: term,
    page: page.toString(),
  });

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      refetch();
    } else if (direction === 'right') {
      setPage(page + 1);
      refetch();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: 'ShowJob',
        }}
      />

      <FlatList
        data={data || []}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{term}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>

            <View style={styles.loaderContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                error && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
      />

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination('left')}>
          <Image source={icons.chevronLeft} style={styles.paginationImage} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.paginationTextBox}>
          <Text style={styles.paginationText}>{page}</Text>
        </View>
        <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination('right')}>
          <Image source={icons.chevronRight} style={styles.paginationImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default JobSearch;
