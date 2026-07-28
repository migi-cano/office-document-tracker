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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../../../navigation/navigation.types";
import { documentAIService } from "../../../types/documentAi.service";
import { AiDocumentAnalysis } from "../../documents/types";
import { useIsFocused } from "@react-navigation/native";
import { useState, useCallback } from "react";
import LoadingOverlay from "../../../components/common/LoadingOverlay";


type ScannerNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "Scanner"
>;

export default function ScannerScreen() {
  const navigation = useNavigation<ScannerNavigationProp>();
  const { permission } = useScanner();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setLoadingMessage("");
    }, [])
  );

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


const handleContinue = async () => {
  if (!photoUri) {
    Alert.alert("No image", "Please capture a document first.");
    return;
  }

  setLoading(true);
  setLoadingMessage("Extracting text...");

  try {
    // OCR.Space
    const ocr = await ocrService.extractDocument(photoUri);

    console.log("OCR:");
    console.log(ocr.fullText);

    setLoadingMessage("Analyzing document...");

    // Gemini
   let analysis: AiDocumentAnalysis;
   setLoadingMessage("Preparing preview...");

        try {
          analysis = await documentAIService.extractDocument(
            ocr.fullText
          );
        } catch (error) {
          console.warn("Gemini extraction failed:", error);

          Alert.alert(
            "AI Unavailable",
            "The document was scanned successfully, but AI extraction is currently unavailable. You can continue and fill in the information manually."
          );

          analysis = {
            documentType: "",
            title: "",
            subject: "",
          };
        }

        setLoading(false);

        navigation.navigate("Documents", {
          screen: "DocumentPreview",
          params: {
            imageUri: photoUri,
            ocrText: ocr.fullText,
            analysis,
          },
        });

        retakePhoto();

  } catch (error) {
    setLoading(false);
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
      title="Continue"
      onPress={handleContinue}
    />
  </View>
) : (
        <View style={{ flex: 1 }}>
          {isFocused ? (
            <CameraView
              ref={cameraRef}
              style={{
                flex: 1,
                borderRadius: 12,
              }}
            />
          ) : null}

          <AppButton
            title="Capture"
            onPress={capturePhoto}
          />
        </View>
      )}

      <LoadingOverlay
        visible={loading}
        message={loadingMessage}
      />

      </ScreenContainer>
    </SafeScreen>
  );
}