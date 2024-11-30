import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  containerStyle?: string;
  handleChangeText: (text: string) => void;
};

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyle,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Render password icon based on isEyeOpen state
  let eyeIcon: ImageSourcePropType = showPassword ? icons.eye : icons.eyeHide;
  useEffect(() => {
    eyeIcon = showPassword ? icons.eye : icons.eyeHide;
  }, [showPassword]);

  return (
    <View className={containerStyle}>
      <Text className="mb-3 text-lg text-white">{title}</Text>
      <View className="h-16 rounded-xl border border-gray-50/10 bg-black-200">
        <TextInput
          className="relative h-full min-w-full px-6 text-white"
          cursorColor="#FF9C01"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            className="absolute right-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image source={eyeIcon} className="w-10" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
