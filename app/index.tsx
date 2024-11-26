import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "@/components/custom-button";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/hooks/use-global-context";

const App = () => {
  const { isLoading, isAuthenticated } = useGlobalContext();

  if (!isLoading && isAuthenticated) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerClassName="flex flex-col items-center justify-center h-full px-4">
        {/* Logo */}
        <Image
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
        />

        {/* Cover Image */}
        <Image
          source={images.cards}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode="contain"
        />

        {/* Main Heading Text */}
        <View className="relative">
          <Text className="text-white font-pbold text-3xl text-center mt-8">
            Discover Endless Possibilities with{" "}
            <Text className="text-secondary-200">Aora</Text>
          </Text>
          <Image
            source={images.path}
            className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
            resizeMode="contain"
          />
        </View>
        <Text className="text-lg text-white font-pregular text-center mt-8">
          Where creativity meets innovation: embark on a journey to transform
          your ideas into reality.
        </Text>

        {/* CTA Button */}
        <CustomButton
          title="Continue with Email"
          containerStyles="mt-8"
          handlePress={() => router.push("/sign-in")}
          isLoading={false}
        />
      </ScrollView>

      <StatusBar backgroundColor="#161622" barStyle={"light-content"} />
    </SafeAreaView>
  );
};

export default App;
