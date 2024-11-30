import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { IVideoModel } from "@/types/types";
import { icons } from "@/constants";
import VideoPlayer from "./video-player";

type TrendingVideosProps = {
  videos: IVideoModel[] | null;
};

const zoomIn = {
  from: {
    transform: [{ scale: 0.8 }],
  },
  to: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.8 }],
  },
};

function TrendingVideoItem({
  video,
  activeVideo,
}: {
  video: IVideoModel;
  activeVideo: IVideoModel | null;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isActive = activeVideo?.$id === video.$id;

  return (
    <Animatable.View
      animation={isActive ? zoomIn : zoomOut}
      duration={300}
      useNativeDriver
      className="h-96 w-64"
    >
      {isPlaying ? (
        <VideoPlayer
          source={video.video}
          onVideoEnd={() => setIsPlaying(false)}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlaying(!isPlaying)}
          className="relative flex flex-col items-center justify-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="h-full w-full rounded-3xl"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}

const TrendingVideos = ({ videos }: TrendingVideosProps) => {
  const [activeVideo, setActiveVideo] = React.useState<IVideoModel | null>(
    videos?.[0] || null,
  );

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setActiveVideo(viewableItems[0].item);
      }
    },
    [],
  );

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 70,
    }),
    [],
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingVideoItem video={item} activeVideo={activeVideo} />
      )}
      horizontal={true}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TrendingVideos;
