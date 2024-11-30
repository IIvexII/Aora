import { icons } from "@/constants";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";

type FileUploaderProps = {
  file:
    | {
        uri: string;
      }
    | undefined;
  onPress: () => Promise<void>;
  children?: React.ReactNode;
  type: "image" | "video";
};

export default function FileUploader({
  file,
  onPress,
  children,
  type,
}: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpload() {
    setIsLoading(true);
    await onPress();
    setIsLoading(false);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mt-4 h-32 items-center justify-center rounded-xl bg-white/10"
      onPress={handleUpload}
      disabled={isLoading}
    >
      {file ? (
        <View className="relative h-full w-full items-center justify-center">
          {isLoading ? (
            // rotate the loader
            <ActivityIndicator size={"large"} color={"orange"} />
          ) : (
            <>
              <Image
                source={{ uri: file.uri }}
                className="h-full w-full rounded-xl opacity-70"
              />
              {type === "video" && (
                <Image
                  source={icons.play}
                  className="absolute h-12 w-12"
                  resizeMode="contain"
                />
              )}
            </>
          )}
        </View>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
