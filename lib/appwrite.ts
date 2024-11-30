import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";
import { IVideoModel } from "@/types/types";
import { ImagePickerAsset } from "expo-image-picker";
import { getFileExtension } from "./utils";

// env
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_PACKAGE_NAME,
  APPWRITE_PROJECT_ID,
  APPWRITE_STORAGE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_VIDEO_COLLECTION_ID,
} from "@/env";

const config = {
  endpoint: APPWRITE_ENDPOINT,
  packageName: APPWRITE_PACKAGE_NAME,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  userCollectionId: APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: APPWRITE_VIDEO_COLLECTION_ID,
  storageId: APPWRITE_STORAGE_ID,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.packageName);

// Initialize services
const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

// Create User
export async function createUser(
  username: string,
  email: string,
  password: string,
) {
  // Function starts here
  const userId = ID.unique();

  // Register User
  const newAccount = await account.create(userId, email, password, username);

  if (!newAccount) {
    throw new Error("Failed to create user");
  }

  // Create user avatar
  const avatarUrl = avatar.getInitials(username);
  // Create user profile
  const newUser = await database.createDocument(
    config.databaseId,
    config.userCollectionId,
    userId,
    {
      accountId: newAccount.$id,
      username,
      email,
      avatar: avatarUrl,
    },
  );

  return newUser;
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    return null;
  }
}

// Sign In and return user
export async function signIn(email: string, password: string) {
  await account.createEmailPasswordSession(email, password);
  return getCurrentUser();
}

// signOut
export async function signOut() {
  return await account.deleteSession("current");
}

// Create Video
export async function createVideo(video: {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
}) {
  const newVideo = await database.createDocument(
    config.databaseId,
    config.videoCollectionId,
    ID.unique(),
    {
      ...video,
    },
  );

  return newVideo;
}

// Get Videos
export async function getVAllideos() {
  const videos = await database.listDocuments(
    config.databaseId,
    config.videoCollectionId,
  );

  return videos.documents as IVideoModel[];
}

// Get trending videos
export async function getTrendingVideos() {
  const videos = await database.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.orderAsc("$createdAt"), Query.limit(3)],
  );

  return videos.documents as IVideoModel[];
}

// Search Videos
export async function searchVideos(query: string) {
  const videos = await database.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.search("title", query)],
  );

  return videos.documents as IVideoModel[];
}

// Get User Videos
export async function getUserVideos(userId: string) {
  const videos = await database.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.equal("creator", userId)],
  );

  return videos.documents as IVideoModel[];
}

// upload video
export async function uploadFile(uri: string) {
  if (!uri) {
    throw new Error("URI is not provided");
  }

  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const file = {
      name: `${ID.unique()}.${getFileExtension(uri)}`,
      type: blob.type,
      size: blob.size,
      uri: uri,
    };

    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      file,
    );

    return uploadedFile;
  } catch (error) {
    throw error;
  }
}

// upload files in bulk parallel
export async function uploadFiles(files: ImagePickerAsset[]) {
  const uploadedFilesUrls: string[] = [];

  for (const file of files) {
    const uploadedFile = await uploadFile(file.uri);
    const url = await getFileUrl(uploadedFile.$id);

    uploadedFilesUrls.push(`${url}`);
  }

  return uploadedFilesUrls;
}

// get file url
export async function getFileUrl(fileId: string) {
  return storage.getFileView(config.storageId, fileId);
}
