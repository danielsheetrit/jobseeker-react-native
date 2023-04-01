import { useState, useCallback } from 'react';

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { Stack, useRouter, useSearchParams } from 'expo-router';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';

import { COLORS, SIZES, icons, images } from '../../constants';
import { useFetch } from '../../hooks';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { id } = useSearchParams();
  const router = useRouter();

  const { data, loading, error, refetch } = useFetch('job-details', {
    job_id: id,
  });

  const onRefresh = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <JobAbout
            info={data[0].job_description || 'No Job Description Mentioned'}
          />
        );
      case 'Qualifications':
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications || ['N/A']}
          />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title="Qualifications"
            points={
              data[0].job_highlights?.Responsibilities || [
                'No Responsibilities Mentioned',
              ]
            }
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      <JobFooter
        url={data[0]?.job_google_link || 'Job is not applicable at the moment'}
      />
    </SafeAreaView>
  );
};

export default JobDetails;
