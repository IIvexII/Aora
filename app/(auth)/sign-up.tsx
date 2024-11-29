import { Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";

import { images } from "@/constants";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/hooks/use-global-context";

const initialFormState = {
  username: "",
  email: "",
  password: "",
};

// Sign up Page
const SignUp = () => {
  // form state
  const [form, setform] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useGlobalContext();

  // Submit form handler function
  const submitHandler = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert(
        "All Fields are Required",
        "Please fill all the fields to register new account in Aora."
      );
      return;
    }

    setIsLoading(true);

    try {
      await createUser(form.username, form.email, form.password);

      await signIn(form.email, form.password);

      // set the states in global context
      setUser(await getCurrentUser());
      setIsAuthenticated(true);

      // redirect the user to home page
      router.replace("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Failed to create user");
      }
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
          Sign up in Aora
        </Text>

        <FormField
          title="Username"
          value={form.username}
          placeholder="Enter your Username"
          handleChangeText={(e) => setform({ ...form, username: e })}
          containerStyle="mt-4"
        />
        <FormField
          title="Email"
          value={form.email}
          placeholder="Enter your email"
          handleChangeText={(e) => setform({ ...form, email: e })}
          containerStyle="mt-8"
        />
        <FormField
          title="Password"
          value={form.password}
          placeholder="Enter your Password"
          handleChangeText={(e) => setform({ ...form, password: e })}
          containerStyle="mt-8"
        />
        <CustomButton
          title="Sign up"
          containerStyles="mt-10"
          isLoading={isLoading}
          handlePress={submitHandler}
        />

        {/* Redirection text for existing users */}
        <Text className="text-white text-center mt-6 text-lg">
          Already have an account?{" "}
          <Link href={"./sign-in"} className="text-secondary">
            Sign in
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
