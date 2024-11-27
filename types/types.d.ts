import { Models } from "react-native-appwrite";

interface IVideoModel extends Models.Document {
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
  creator: {
    username: string;
    avatar: string;
  };
}
