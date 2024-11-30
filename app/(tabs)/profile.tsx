import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "react-native";

import useAppWrite from "@/hooks/use-appwrite";
import { GlobalContext } from "@/context/global-provider";
import { getUserVideos, signOut } from "@/lib/appwrite";

import VideoCard from "@/components/video-card";
import InfoBox from "@/components/info-box";
import { icons } from "@/constants";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, setIsAuthenticated, isAuthenticated } =
    useContext(GlobalContext);

  // check if the user is logged in else redirect it to onboarding screen
  if (!isAuthenticated || !user) return router.replace("/");

  // Custom hook to fetch the videos data from database.
  const { data: videos, refetch } = useAppWrite(
    getUserVideos.bind(null, user.$id),
  );

  async function handleSignOut() {
    await signOut();
    setIsAuthenticated!(false);
    setUser!(null);

    router.replace("/sign-in");
  }

  async function refresh() {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        className="px-6 pt-16"
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={
          <View className="mb-8">
            <TouchableOpacity
              onPress={handleSignOut}
              className="mb-4 flex-row justify-end"
            >
              <Image source={icons.logout} className="h-6 w-6" />
            </TouchableOpacity>
            {/* User Info -- avatar and username */}
            <View className="w-full items-center justify-center gap-2">
              <Image
                source={{ uri: user.avatar }}
                className="h-28 w-28 rounded-xl border border-secondary"
              />
              <Text className="font-pmedium text-2xl text-green-100">
                @{user.username}
              </Text>
            </View>

            {/* user account info -- post count and followers */}
            <View className="mt-8 w-full flex-row items-center justify-center gap-12">
              <InfoBox title={videos?.length || 0} subtitle="Posts" />
              <InfoBox title="1.6K" subtitle="Followers" />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
