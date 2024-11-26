import { Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";

import { images } from "@/constants";
import CustomButton from "@/components/custom-button";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    console.log(form);
  };

  return (
    <SafeAreaView className="bg-primary h-full px-6">
      <ScrollView contentContainerClassName="flex flex-col items-center justify-center h-full">
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[35px]"
        />
        <Text className="text-white text-2xl font-psemibold text-center my-8">
          Log in to Aora
        </Text>

        <FormField
          title="Email"
          value={form.email}
          placeholder="Enter your email"
          handleChangeText={(e) => setform({ ...form, email: e })}
          containerStyle="mt-4"
        />
        <FormField
          title="Password"
          value={form.password}
          placeholder="Enter your Password"
          handleChangeText={(e) => setform({ ...form, password: e })}
          containerStyle="mt-8"
        />
        <CustomButton
          title="Sign in"
          containerStyles="mt-10"
          handlePress={submit}
        />

        <Text className="text-white text-center mt-6 text-lg">
          Don't have an account?{" "}
          <Link href={"./sign-up"} className="text-secondary">
            Sign up
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
