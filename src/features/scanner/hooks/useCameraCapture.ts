import { useRef, useState } from "react";
import { CameraView } from "expo-camera";

export function useCameraCapture() {
  const cameraRef = useRef<CameraView>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  async function capturePhoto() {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.5,
    });

    if (!photo) return;

    setPhotoUri(photo.uri);
  }

  function retakePhoto() {
    setPhotoUri(null);
  }
  

  return {
    cameraRef,
    photoUri,
    capturePhoto,
    retakePhoto,
  };
}