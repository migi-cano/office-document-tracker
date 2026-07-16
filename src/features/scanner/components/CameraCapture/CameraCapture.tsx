import { CameraView } from "expo-camera";

import { CameraCaptureProps } from "./CameraCapture.types";

export default function CameraCapture({
  cameraRef,
}: CameraCaptureProps) {
  return (
    <CameraView
      ref={cameraRef}
      style={{
        flex: 1,
        borderRadius: 12,
      }}
    />
  );
}