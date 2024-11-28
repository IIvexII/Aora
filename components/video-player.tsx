import { StyleSheet, View } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";

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
  const videoCallbacks = {
    ended: onVideoEnd,
  };

  const videoId = source.split("/")[source.split("/").length - 1].split("?")[0];

  return (
    <View className={`rounded-3xl w-full h-full bg-black ${className}`}>
      <Vimeo
        style={{ backgroundColor: "black" }}
        startInLoadingState
        videoId={videoId}
        params="autoplay=true"
        handlers={videoCallbacks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 500,
  },
});
