import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="items-center justify-center">
      <Image source={images.empty} className="h-80 w-80" resizeMode="contain" />
      <Text className="-mt-6 text-2xl font-semibold text-white">{title}</Text>
      <Text className="font-pregular text-sm text-green-100">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => {}}
        containerStyles="mt-6"
      />
    </View>
  );
};

export default EmptyState;
