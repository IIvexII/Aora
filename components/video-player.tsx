import { StyleSheet, View } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";
import { useVideoPlayer, VideoView } from "expo-video";

type VideoPlayerProps = {
  className?: string;
  source: string;
  onVideoEnd: () => void;
};

export default function VideoPlayer({
  className,
  source,
  onVideoEnd,
}: VideoPlayerProps) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.addListener("playToEnd", onVideoEnd);
    player.play();
  });
  const videoCallbacks = {
    ended: onVideoEnd,
  };

  // check if the source is a valid vimeo video url or appwrite storage url
  if (source.includes("vimeo.com")) {
    const videoId = source
      .split("/")
      [source.split("/").length - 1].split("?")[0];

    return (
      <View className={`h-full w-full rounded-3xl bg-black ${className}`}>
        <Vimeo
          style={{ backgroundColor: "black" }}
          startInLoadingState
          videoId={videoId}
          params="autoplay=true"
          handlers={videoCallbacks}
        />
      </View>
    );
  } else {
    return (
      <View className={`h-full w-full rounded-3xl bg-black ${className}`}>
        <VideoView player={player} style={StyleSheet.absoluteFillObject} />
      </View>
    );
  }
}
