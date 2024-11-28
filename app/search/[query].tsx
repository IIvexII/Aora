import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "@/components/search-bar";
import EmptyState from "@/components/empty-state";

import useAppWrite from "@/hooks/use-appwrite";
import { GlobalContext } from "@/context/global-provider";

import { searchVideos } from "@/lib/appwrite";
import VideoCard from "@/components/video-card";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { user } = useContext(GlobalContext);

  // Custom hook to fetch the videos data from database.
  const { data: videos, refetch } = useAppWrite(() =>
    searchVideos(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

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
                  Search Results
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {query}
                </Text>
              </View>
            </View>

            {/* Search Bar */}
            <SearchBar
              initialQuery={query as string}
              placeholder="Search here..."
              containerStyle="mt-6"
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No search result found!"
            subtitle="Create your own video on this topic."
          />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
