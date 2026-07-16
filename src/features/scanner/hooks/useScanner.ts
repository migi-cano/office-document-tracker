import { useEffect } from "react";
import { useCameraPermissions } from "expo-camera";

export function useScanner() {
  const [permission, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return {
    permission,
  };
}