import React, { useState } from "react";
import { Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";

import { images } from "@/constants";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/hooks/use-global-context";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useGlobalContext();

  // submit form handler function
  const submitHandler = async () => {
    if (!form.email || !form.password) {
      Alert.alert(
        "All Fields are Required",
        "Please fill all the fields to sign into Aora."
      );
      return;
    }

    setIsLoading(true);

    try {
      const session = await signIn(form.email, form.password);
      setUser!(await getCurrentUser());
      setIsAuthenticated!(true);

      // redirect the user to home page
      router.push("/home");
    } catch (error: unknown) {
      console.log(error);
      Alert.alert("Invalid Credentials", "Email or password is incorrect");
    } finally {
      setIsLoading(false);
    }
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
          isLoading={isLoading}
          containerStyles="mt-10"
          handlePress={submitHandler}
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
