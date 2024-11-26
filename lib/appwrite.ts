import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";
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

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  // Function starts here
  try {
    // Register User
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Failed to create user");
    }

    // Create user avatar
    const avatarUrl = avatar.getInitials(username);

    // Create user profile
    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: avatarUrl,
      }
    );

    await SignIn(email, password);

    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const SignIn = async (email: string, password: string) => {
  try {
    return await account.createSession(email, password);
  } catch (error) {
    console.error(error);
    return null;
  }
};
