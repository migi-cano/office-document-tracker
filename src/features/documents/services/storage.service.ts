import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../../lib/supabase";

class StorageService {
  async uploadImage(uri: string): Promise<string> {
    console.log("===== STORAGE UPLOAD START =====");
    console.log("Image URI:", uri);
    console.log(
      "Supabase URL:",
      process.env.EXPO_PUBLIC_SUPABASE_URL
    );
    console.log(
      "Anon Key Exists:",
      !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    );

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Base64 Length:", base64.length);

    const filePath = `${Date.now()}.jpg`;

    console.log("Uploading to bucket: documents");
    console.log("Uploading path:", filePath);

    const { data, error } = await supabase.storage
      .from("documents")
      .upload(filePath, decode(base64), {
        contentType: "image/jpeg",
        upsert: false,
      });

    console.log("Upload Data:", data);
    console.log("Upload Error:", error);

    if (error) {
      console.log("Status Code:", (error as any).statusCode);
      console.log("Error Name:", error.name);
      console.log("Error Message:", error.message);
      console.log("Full Error:", JSON.stringify(error, null, 2));

      throw error;
    }

    console.log("===== STORAGE UPLOAD SUCCESS =====");

    return filePath;
  }

  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from("documents")
      .remove([path]);

    if (error) throw error;
  }

  async getSignedUrl(path: string) {
  const { data: files, error: listError } =
    await supabase.storage
      .from("documents")
      .list();

  console.log("Files:", files);
  console.log("List Error:", listError);

  const { data, error } =
    await supabase.storage
      .from("documents")
      .createSignedUrl(path, 3600);

  console.log("Signed URL:", data);
  console.log("Signed URL Error:", error);

  if (error) throw error;

  return data.signedUrl;
}
}

export const storageService = new StorageService();