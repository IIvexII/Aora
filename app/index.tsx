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
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerClassName="flex flex-col items-center justify-center h-full px-4">
        {/* Logo */}
        <Image
          source={images.logo}
          className="h-[84px] w-[130px]"
          resizeMode="contain"
        />

        {/* Cover Image */}
        <Image
          source={images.cards}
          className="h-[300px] w-full max-w-[380px]"
          resizeMode="contain"
        />

        {/* Main Heading Text */}
        <View className="relative">
          <Text className="mt-8 text-center font-pbold text-3xl text-white">
            Discover Endless Possibilities with{" "}
            <Text className="text-secondary-200">Aora</Text>
          </Text>
          <Image
            source={images.path}
            className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
            resizeMode="contain"
          />
        </View>
        <Text className="mt-8 text-center font-pregular text-lg text-white">
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
