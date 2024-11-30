import { View, Text } from "react-native";
import React from "react";

type InfoBoxProps = {
  title: string | number;
  subtitle: string;
};

export default function InfoBox({ title, subtitle }: InfoBoxProps) {
  return (
    <View className="flex-col items-center justify-center">
      <Text className="font-psemibold text-xl text-white">{title}</Text>
      <Text className="font-pregular text-gray-100">{subtitle}</Text>
    </View>
  );
}
