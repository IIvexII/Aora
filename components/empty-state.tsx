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
    <View className="justify-center items-center">
      <Image source={images.empty} className="w-80 h-80" resizeMode="contain" />
      <Text className="text-white text-2xl font-semibold -mt-6">{title}</Text>
      <Text className="text-green-100 text-sm font-pregular">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => {}}
        containerStyles="mt-6"
      />
    </View>
  );
};

export default EmptyState;
