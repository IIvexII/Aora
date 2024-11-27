import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  packageName: "com.vectorx.aora",
  projectId: "6745669d000053d2729e",
  databaseId: "67456873000d648ea192",
  userCollectionId: "674569090023a9bc0715",
  videoCollectionId: "67456a3d000d22515f0b",
  storageId: "67456b3e000a91253266",
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.packageName);

// Initialize services
const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

// Create User
export async function createUser(
  username: string,
  email: string,
  password: string
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
    }
  );

  await signIn(email, password);

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
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  return await account.createEmailPasswordSession(email, password);
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
    }
  );

  return newVideo;
}

// Get Videos
export async function getVAllideos() {
  const videos = await database.listDocuments(
    config.databaseId,
    config.videoCollectionId
  );

  return videos.documents;
}
