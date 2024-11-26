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
      className={`bg-secondary min-h-[58px] rounded-2xl w-full justify-center items-center ${containerStyles} ${
        isLoading && "bg-secondary/80"
      }`}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
