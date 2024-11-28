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
      <View className="flex-row items-center  justify-between gap-2">
        <View className="flex-row justify-center items-center gap-4">
          <View className="rounded-lg w-12 h-12">
            <Image
              source={creator ? { uri: creator?.avatar } : icons.guest}
              className={`w-full h-full rounded-lg ${
                creator ? "" : "bg-secondary-200"
              }`}
            />
          </View>
          {/* Video details -- title and username */}
          <View>
            <Text className="text-white font-psemibold">{title}</Text>
            <Text className="text-gray-100 font-pregular ">
              {creator?.username ? `@${creator.username}` : `@guest`}
            </Text>
          </View>
        </View>
        <Image source={icons.menu} resizeMode="contain" className="w-4 h-6" />
      </View>

      {/* video thumbnail */}
      {isPlaying ? (
        <View className="mt-4 h-[250px] bg-black-200">
          <VideoPlayer
            className="w-full h-full"
            source={video}
            onVideoEnd={() => setIsPlaying(false)}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}
          className="mt-4 relative items-center justify-center"
        >
          <Image source={{ uri: thumbnail }} className="w-full h-64" />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </View>
  );
}
