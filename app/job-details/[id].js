import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import { COLORS, SIZES, icons } from '../../constants';

import { useFetch } from '../../hooks';
import { Company, JobFooter, JobTabs, ScreenHeaderBtn, FetchCmpWrapper } from '../../components';
import DisplayCmpJunction from './DisplayCmpJunction';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

function JobDetails() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { id } = useSearchParams();
  const router = useRouter();

  const { data, loading, error, refetch } = useFetch('job-details', {
    job_id: id,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: 'ShowJob',
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <FetchCmpWrapper loading={loading} error={error}>
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <DisplayCmpJunction activeTab={activeTab} tabs={tabs} data={data[0]} />
          </View>
        </FetchCmpWrapper>
      </ScrollView>

      <JobFooter url={data[0]?.job_google_link || 'Job is not applicable at the moment'} />
    </SafeAreaView>
  );
}

export default JobDetails;
