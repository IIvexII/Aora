import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";

const EmptyState = () => {
  return (
    <View className="justify-center items-center">
      <Image source={images.empty} className="w-80 h-80" resizeMode="contain" />
      <Text className="text-white text-2xl font-semibold -mt-6">
        No Video Found
      </Text>
      <Text className="text-green-100 text-sm font-pregular">
        Be the first one to create video!
      </Text>

      <CustomButton
        title="Create Video"
        handlePress={() => {}}
        containerStyles="mt-6"
      />
    </View>
  );
};

export default EmptyState;
