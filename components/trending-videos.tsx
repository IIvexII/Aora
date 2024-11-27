import React from "react";
import { Text, FlatList } from "react-native";

const TrendingVideos = ({ posts }: { posts: { id: number }[] }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Text className="text-white text-3xl">{item.id}</Text>
      )}
      horizontal={true}
    />
  );
};

export default TrendingVideos;
