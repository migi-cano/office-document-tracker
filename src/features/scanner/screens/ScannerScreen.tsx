import { CameraView } from "expo-camera";
import { Image, Pressable, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import AppText from "../../../components/common/AppText";
import AppButton from "../../../components/common/AppButton";

import { useScanner } from "../hooks/useScanner";
import { useCameraCapture } from "../hooks/useCameraCapture";

import { ocrService } from "../../../services/ocr.service";

import {
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../../../navigation/navigation.types";

import { documentAIService } from "../../../types/documentAi.service";
import { AiDocumentAnalysis } from "../../documents/types";

import { useState, useCallback } from "react";

import LoadingOverlay from "../../../components/common/LoadingOverlay";

import { ScannerHeader } from "../components";

import { styles } from "./ScannerScreen.styles";

type ScannerNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "Scanner"
>;

export default function ScannerScreen() {
  const navigation =
    useNavigation<ScannerNavigationProp>();

  const { permission } = useScanner();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const {
    cameraRef,
    photoUri,
    capturePhoto,
    retakePhoto,
  } = useCameraCapture();

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setLoadingMessage("");
    }, [])
  );

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <SafeScreen backgroundColor="#0D1233">
        <StatusBar style="light" />

        <ScannerHeader title="Scanner" />

        <View style={styles.container}>
          <View style={styles.content}>
            <AppText>
              Camera permission required.
            </AppText>
          </View>
        </View>
      </SafeScreen>
    );
  }

  const handleContinue = async () => {
    if (!photoUri) {
      Alert.alert(
        "No image",
        "Please capture a document first."
      );
      return;
    }

    setLoading(true);
    setLoadingMessage("Extracting text...");

    try {
      const ocr =
        await ocrService.extractDocument(photoUri);

      console.log("OCR:");
      console.log(ocr.fullText);

      setLoadingMessage("Analyzing document...");

      let analysis: AiDocumentAnalysis;

      setLoadingMessage("Preparing preview...");

      try {
        analysis =
          await documentAIService.extractDocument(
            ocr.fullText
          );
      } catch (error) {
        console.warn(
          "Gemini extraction failed:",
          error
        );

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
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <ScannerHeader title="Scanner" />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {!photoUri ? (
              <>
                <AppText style={styles.instruction}>
                  Position the document inside the frame
                </AppText>

                <View style={styles.cameraContainer}>
                  {isFocused ? (
                    <CameraView
                      ref={cameraRef}
                      style={styles.camera}
                    />
                  ) : null}

                    <AppText style={styles.frameHint}>
                      Make sure the entire document is
                      visible
                    </AppText>
                  </View>

                <View style={styles.captureContainer}>
                  <Pressable
                    style={styles.captureButton}
                    onPress={capturePhoto}
                  >
                    <View
                      style={
                        styles.captureButtonInner
                      }
                    />
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <AppText style={styles.instruction}>
                  Review the captured document
                </AppText>

                <View style={styles.previewContainer}>
                  <Image
                    source={{ uri: photoUri }}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.previewActions}>
                  <AppButton
                    title="Retake"
                    onPress={retakePhoto}
                    style={styles.actionButton}
                  />

                  <AppButton
                    title="Continue"
                    onPress={handleContinue}
                    style={styles.actionButton}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollableScreen>
      </View>

      <LoadingOverlay
        visible={loading}
        message={loadingMessage}
      />
    </SafeScreen>
  );
}