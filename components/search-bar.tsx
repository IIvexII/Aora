import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";

type FormFieldProps = {
  placeholder: string;
  value?: string;
  containerStyle?: string;
  handleChangeText?: (text: string) => void;
};

const SearchBar = ({
  value,
  placeholder,
  handleChangeText,
  containerStyle,
}: FormFieldProps) => {
  return (
    <View className={containerStyle}>
      <View className="border border-gray-50/10 rounded-xl h-16 bg-black-200">
        <TextInput
          className="relative text-white h-full min-w-full px-6"
          cursorColor="#FF9C01"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity className="absolute right-4">
          <Image source={icons.search} className="w-10" resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
