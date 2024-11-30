import { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { GlobalContext } from "@/context/global-provider";

import { icons } from "@/constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import FileUploader from "@/components/file-uploader";

type FormType = {
  title: string;
  video: { uri: string } | undefined;
  thumbnail: { uri: string } | undefined;
  aiPrompt: string;
};

const initialForm = {
  title: "",
  video: undefined,
  thumbnail: undefined,
  aiPrompt: "",
};

const Create = () => {
  const [form, setFrom] = useState<FormType>(initialForm);
  const [isUploading, setIsUploading] = useState(false);

  const { user, isAuthenticated } = useContext(GlobalContext);

  // check if the user is logged in else redirect it to onboarding screen
  if (!isAuthenticated || !user) return router.replace("/");

  function handleUpload() {
    setIsUploading(true);
    // perform upload logic here
    // set deplay for temporary loading state
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);

    setIsUploading(false);
  }

  async function openPicker(type: "images" | "videos") {
    if (type !== "videos" && type !== "images") {
      throw new Error("Invalid type for openPicker()");
    }

    // If there's a previous asset, delete it first
    if (form[type === "images" ? "thumbnail" : "video"]) {
      const previousAsset = form[type === "images" ? "thumbnail" : "video"];

      if (!previousAsset) return;

      try {
        if (previousAsset.uri.startsWith(FileSystem.cacheDirectory || "")) {
          await FileSystem.deleteAsync(previousAsset.uri);
        }
      } catch (error) {
        console.log("Error deleting previous asset:", error);
      }
    }

    // open video picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [type],
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setFrom({
        ...form,
        [type === "images" ? "thumbnail" : "video"]: result.assets[0],
      });
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 py-8">
        <Text className="text-2xl font-semibold text-white">Upload Video</Text>
        <View className="mt-12 gap-6">
          <FormField
            title="Video Title"
            placeholder="Give your video a catchy title..."
            handleChangeText={(text) => setFrom({ ...form, title: text })}
            value={form.title}
          />

          {/* Video Upload */}
          <View>
            <Text className="mb-4 text-lg text-white">Upload Video</Text>
            <FileUploader
              file={form.video}
              onPress={openPicker.bind(null, "videos")}
              type="video"
            >
              <Image source={icons.upload} className="h-12 w-12" />
            </FileUploader>
          </View>

          {/* Thumbnail Upload */}
          <View>
            <Text className="mt-4 text-lg text-white">Upload Thumbnail</Text>
            <FileUploader
              file={form.thumbnail}
              onPress={openPicker.bind(null, "images")}
              type="image"
            >
              <View className="flex h-full w-full flex-row items-center justify-center gap-2 pl-1">
                <Image source={icons.upload} className="h-10 w-10" />
                <Text className="font-pregular text-white">
                  Upload Thumbnail
                </Text>
              </View>
            </FileUploader>
          </View>

          {/* AI Prompt */}
          <FormField
            title="AI Prompt"
            placeholder="The AI prompt of your video.."
            handleChangeText={(text) => setFrom({ ...form, aiPrompt: text })}
            value={form.aiPrompt}
          />

          {/* Upload Button */}
          <CustomButton
            containerStyles="mt-6"
            title="Submit & Publish"
            handlePress={handleUpload}
            isLoading={isUploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
