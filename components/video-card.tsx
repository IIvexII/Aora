import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { IVideoModel } from "@/types/types";
import { icons } from "@/constants";
import VideoPlayer from "./video-player";

type VideoCardProps = {
  video: IVideoModel;
};

export default function VideoCard({
  video: { title, thumbnail, video, prompt, creator },
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View className="mt-4">
      {/* top header of post */}
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-row items-center justify-center gap-4">
          <View className="h-12 w-12 rounded-lg">
            <Image
              source={creator ? { uri: creator?.avatar } : icons.guest}
              className={`h-full w-full rounded-lg ${
                creator ? "" : "bg-secondary-200"
              }`}
            />
          </View>
          {/* Video details -- title and username */}
          <View>
            <Text className="font-psemibold text-white">{title}</Text>
            <Text className="font-pregular text-gray-100">
              {creator?.username ? `@${creator.username}` : `@guest`}
            </Text>
          </View>
        </View>
        <Image source={icons.menu} resizeMode="contain" className="h-6 w-4" />
      </View>

      {/* video thumbnail */}
      {isPlaying ? (
        <View className="mb-4 h-[250px] bg-black-200">
          <VideoPlayer
            className="h-full w-full"
            source={video}
            onVideoEnd={() => setIsPlaying(false)}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}
          className="relative mt-4 items-center justify-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="h-64 w-full rounded-3xl"
          />
          <Image source={icons.play} className="absolute h-12 w-12" />
        </TouchableOpacity>
      )}
    </View>
  );
}
