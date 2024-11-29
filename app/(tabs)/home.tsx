import React, { useContext, useState } from "react";
import { Image, RefreshControl } from "react-native";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Models } from "react-native-appwrite";

import SearchBar from "@/components/search-bar";
import TrendingVideos from "@/components/trending-videos";
import EmptyState from "@/components/empty-state";

import useAppWrite from "@/hooks/use-appwrite";
import { GlobalContext } from "@/context/global-provider";

import { capitalize } from "@/lib/utils";
import { getTrendingVideos, getVAllideos } from "@/lib/appwrite";
import { images } from "@/constants";
import VideoCard from "@/components/video-card";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(GlobalContext);

  // Custom hook to fetch the videos data from database.
  const { data: videos, refetch } = useAppWrite(getVAllideos);
  const { data: trendingVideos, refetch: trendingRefetch } =
    useAppWrite(getTrendingVideos);

  // When user pull down the screen it will
  // refetch the videos data from database again.
  async function onRefresh() {
    setRefreshing(true);
    await refetch();
    await trendingRefetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="px-6 pt-16"
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={
          <View className="mb-8">
            {/* top welcome text with name */}
            <View className="flex justify-between flex-row pr-1">
              <View>
                <Text className="text-sm text-green-100 font-pmedium">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {capitalize(user?.username as string)}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="w-9 h-12 "
                resizeMode="contain"
              />
            </View>

            {/* Search Bar */}
            <SearchBar placeholder="Search here..." containerStyle="mt-6" />

            {/* Trending Posts */}
            <View>
              <Text className="text-white text-lg font-pregular mt-8 mb-6">
                Trending Posts
              </Text>
              <TrendingVideos videos={trendingVideos} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No Video Found"
            subtitle="Be the first one to create video!"
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
