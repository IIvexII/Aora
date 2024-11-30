import { useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { router, usePathname } from "expo-router";

import { icons } from "@/constants";

type FormFieldProps = {
  placeholder: string;
  value?: string;
  containerStyle?: string;
  initialQuery?: string;
};

const SearchBar = ({
  value,
  placeholder,
  containerStyle,
  initialQuery,
}: FormFieldProps) => {
  const [query, setQuery] = useState("");
  const pathmame = usePathname();

  function handleSearch() {
    if (!query)
      return Alert.alert(
        "Empty Search Field",
        "Please enter something to search into our database.",
      );

    if (pathmame.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  }

  return (
    <View className={containerStyle}>
      <View className="h-16 rounded-xl border border-gray-50/10 bg-black-200">
        <TextInput
          className="relative h-full min-w-full px-6 text-white"
          cursorColor="#FF9C01"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={(e) => setQuery(e)}
          defaultValue={initialQuery}
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="absolute right-6 top-1"
        >
          <Image source={icons.search} className="w-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
