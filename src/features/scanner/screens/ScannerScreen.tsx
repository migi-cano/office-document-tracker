import { CameraView } from "expo-camera";
import { Image, View, Alert } from "react-native";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import AppText from "../../../components/common/AppText";
import AppButton from "../../../components/common/AppButton";

import { useScanner } from "../hooks/useScanner";
import { useCameraCapture } from "../hooks/useCameraCapture";
import { ocrService } from "../../../services/ocr.service";

import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { MainTabParamList } from "../../../navigation/navigation.types";
import { documentAIService } from "../../../services/documentAi.service";

type ScannerNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "Scanner"
>;

export default function ScannerScreen() {
  const navigation = useNavigation<ScannerNavigationProp>();
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

  const handleTestOCR = async () => {
  if (!photoUri) {
    Alert.alert("No image", "Please capture a document first.");
    return;
  }

  try {
    const result = await ocrService.extractDocument(photoUri);

    console.log("===== OCR RESULT =====");
    console.log(result);
    console.log(result.fullText);

    Alert.alert(
      "OCR Success",
      result.fullText || "No text detected."
    );
  } catch (error) {
    console.error(error);
    Alert.alert(
      "OCR Failed",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
};

const handleContinue = async () => {
  if (!photoUri) {
    Alert.alert("No image", "Please capture a document first.");
    return;
  }

  try {
    // OCR.Space
    const ocr = await ocrService.extractDocument(photoUri);

    console.log("OCR:");
    console.log(ocr.fullText);

    // Gemini
    const ai = await documentAIService.extractDocument(
      ocr.fullText
    );

    console.log("Gemini:");
    console.log(ai);

    navigation.navigate("Documents", {
  screen: "ReceiveDocument",
  params: {
    imageUri: photoUri,
    ocrText: ocr.fullText,
    title: ai.title,
    subject: ai.subject,
    documentType: ai.documentType,
  },
});
  } catch (error) {
    console.error(error);

    Alert.alert(
      "Failed",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );
  }
};

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
      title="Test OCR"
      onPress={handleTestOCR}
    />

    <AppButton
      title="Continue"
      onPress={handleContinue}
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