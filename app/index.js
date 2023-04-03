import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { useFetch } from '../hooks';

import { COLORS, SIZES, icons, images } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Chatbot } from '../components';
import 'react-native-url-polyfill/auto';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });

  const handleSearchNavigate = () => {
    if (!searchTerm.trim() === '') return;

    router.push(`/search/${searchTerm}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,
          headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />,
          headerTitle: 'ShowJob',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchNavigate={handleSearchNavigate}
          />

          <Popularjobs data={data} loading={loading} error={error} />

          <Nearbyjobs data={data} loading={loading} error={error} />
        </View>
      </ScrollView>

      <Chatbot isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </SafeAreaView>
  );
}
