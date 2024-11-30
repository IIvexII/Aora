import * as FileSystem from "expo-file-system";

export function capitalize(text: string | null) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return "";
}

export async function purgeAppCache() {
  try {
    const cacheDirectory = FileSystem.cacheDirectory;

    if (cacheDirectory) {
      // Read directory contents
      const files = await FileSystem.readDirectoryAsync(cacheDirectory);

      // Delete each file/directory within the cache directory
      await Promise.all(
        files.map((file) =>
          FileSystem.deleteAsync(cacheDirectory + file, { idempotent: true }),
        ),
      );

      console.log("app cache purged...");
    }
  } catch (error) {
    console.log("Error purging cache:", error);
  }
}

// get extension from uri
export function getFileExtension(uri: string) {
  const uriSplit = uri.split("/");
  const extension = uriSplit[uriSplit.length - 1].split(".")[1];

  return extension;
}
