import { View, Text } from "react-native";
import React from "react";

type InfoBoxProps = {
  title: string | number;
  subtitle: string;
};

export default function InfoBox({ title, subtitle }: InfoBoxProps) {
  return (
    <View className="flex-col justify-center items-center">
      <Text className="text-xl text-white font-psemibold">{title}</Text>
      <Text className="text-gray-100 font-pregular">{subtitle}</Text>
    </View>
  );
}
