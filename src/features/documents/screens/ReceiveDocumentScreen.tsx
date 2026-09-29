import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import DocumentForm from "../components/DocumentForm";

import { documentService } from "../services/document.service";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";

import { ReceiveDocumentFormData } from "../validation/receiveDocument.schema";
import { DocumentStatus } from "../types/document.types";
import { parseOcr } from "../utils/parseOcr";
import { storageService } from "../services/storage.service";

import { useDepartments } from "../../departments/hooks/useDepartments";

import { styles } from "./ReceiveDocumentScreen.styles";

type ReceiveDocumentNavigationProp =
  NativeStackNavigationProp<
    DocumentsStackParamList,
    "ReceiveDocument"
  >;

type ReceiveDocumentRouteProp =
  RouteProp<
    DocumentsStackParamList,
    "ReceiveDocument"
  >;

export default function ReceiveDocumentScreen() {
  const navigation =
    useNavigation<ReceiveDocumentNavigationProp>();

  const route =
    useRoute<ReceiveDocumentRouteProp>();

  const { analysis } = route.params;

  const { departments, loading } =
    useDepartments();

  const {
    title: aiTitle,
    subject: aiSubject,
    documentType: aiDocumentType,
  } = analysis;

  const ocrText =
    route.params?.ocrText ?? "";

  const imageUri =
    route.params?.imageUri ?? "";

  const parsed = parseOcr(ocrText);

  async function handleCreate(
    data: ReceiveDocumentFormData
  ) {
    try {
      const now =
        new Date().toISOString();

      let imagePath:
        | string
        | undefined;

      if (imageUri) {
        imagePath =
          await storageService.uploadImage(
            imageUri
          );
      }

      await documentService.addDocument({
        id: "",

        trackingNumber:
          generateTrackingNumber(),

        direction: "IN",

        documentType:
          data.documentType,

        title:
          data.title,

        subject:
          data.subject,

        departmentFrom:
          data.departmentFrom,

        destination: "",

        processedBy: "",

        receivedBy:
          data.receivedBy,

        status:
          DocumentStatus.RECEIVED,

        remarks:
          data.remarks ?? "",

        documentDate: now,

        ocrText,

        attachmentUrl:
          imageUri,

        createdAt: now,

        updatedAt: now,

        imagePath,
      });

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "DocumentsList",
          },
        ],
      });
    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );

      Alert.alert(
        "Upload Failed",
        error instanceof Error
          ? error.message
          : JSON.stringify(error)
      );
    }
  }

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle}>
          Receive Document
        </AppText>
      </View>

      {/* Content */}
      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            <View style={styles.intro}>
              <AppText style={styles.sectionTitle}>
                Incoming Document Information
              </AppText>

              <AppText style={styles.description}>
                Review and complete the information
                before saving this incoming document.
              </AppText>
            </View>

            <View style={styles.formCard}>
              <DocumentForm
                direction="IN"
                initialValues={{
                  title:
                    aiTitle ||
                    parsed.title,

                  subject:
                    aiSubject ||
                    parsed.subject,

                  documentType:
                    aiDocumentType,
                }}
                submitButtonTitle="Save Incoming Document"
                onSubmit={handleCreate}
              />
            </View>

            <View style={styles.bottomSpacing} />

          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}