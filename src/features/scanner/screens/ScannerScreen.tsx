import { CameraView } from "expo-camera";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import AppText from "../../../components/common/AppText";

import { useScanner } from "../hooks/useScanner";
import { Image, View } from "react-native";

import AppButton from "../../../components/common/AppButton";

import { useCameraCapture } from "../hooks/useCameraCapture";
export default function ScannerScreen() {
  const { permission } = useScanner();

  const {
  cameraRef,
  photoUri,
  capturePhoto,
  retakePhoto,
} = useCameraCapture();


  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <SafeScreen>
        <ScreenContainer>
          <AppText>
            Camera permission required.
          </AppText>
        </ScreenContainer>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <ScreenContainer>

        <AppHeader
          title="Scanner"
          subtitle="Capture outgoing document"
        />

        {photoUri ? (
  <View style={{ flex: 1 }}>
    <Image
      source={{ uri: photoUri }}
      style={{
        flex: 1,
        borderRadius: 12,
      }}
      resizeMode="contain"
    />

    <AppButton
      title="Retake"
      onPress={retakePhoto}
    />

    <AppButton
      title="Continue"
      onPress={() => {}}
    />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <CameraView
            ref={cameraRef}
            style={{
              flex: 1,
              borderRadius: 12,
            }}
          />

          <AppButton
            title="Capture"
            onPress={capturePhoto}
          />
        </View>
      )}

      </ScreenContainer>
    </SafeScreen>
  );
}