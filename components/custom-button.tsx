import React from "react";
import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

function CustomButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      className={`min-h-[58px] w-full items-center justify-center rounded-2xl bg-secondary ${containerStyles} ${
        isLoading && "bg-secondary/80"
      }`}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-lg text-primary ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
