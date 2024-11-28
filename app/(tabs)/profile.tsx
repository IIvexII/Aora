import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "react-native";

import useAppWrite from "@/hooks/use-appwrite";
import { GlobalContext } from "@/context/global-provider";
import { getUserVideos } from "@/lib/appwrite";

import VideoCard from "@/components/video-card";
import InfoBox from "@/components/info-box";
import { icons } from "@/constants";

const Profile = () => {
  const { user, isAuthenticated } = useContext(GlobalContext);

  // check if the user is logged in else redirect it to onboarding screen
  if (!isAuthenticated || !user) return router.push("/");

  // Custom hook to fetch the videos data from database.
  const { data: videos } = useAppWrite(getUserVideos.bind(null, user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="px-6 pt-16"
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={
          <View className="mb-8">
            <View className="flex-row justify-end mb-4">
              <Image source={icons.logout} className="w-6 h-6" />
            </View>
            {/* User Info -- avatar and username */}
            <View className="items-center justify-center w-full gap-2">
              <Image
                source={{ uri: user.avatar }}
                className="w-28 h-28 rounded-xl border border-secondary"
              />
              <Text className="text-2xl text-green-100 font-pmedium">
                @{user.username}
              </Text>
            </View>

            {/* user account info -- post count and followers */}
            <View className="mt-8 flex-row gap-12 justify-center items-center w-full">
              <InfoBox title={videos?.length || 0} subtitle="Posts" />
              <InfoBox title="1.6K" subtitle="Followers" />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
