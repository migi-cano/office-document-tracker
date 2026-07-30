import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
  ScrollableScreen,
} from "../../../components/layout";

import DocumentForm from "../components/DocumentForm";

import { documentService } from "../services/document.service";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";

import { ReceiveDocumentFormData } from "../validation/receiveDocument.schema";
import { DocumentStatus } from "../types/document.types";
import { parseOcr } from "../utils/parseOcr";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { storageService } from "../services/storage.service";
import { Alert } from "react-native";



export default function ReceiveDocumentScreen() {
  type OutgoingDocumentNavigationProp =
  NativeStackNavigationProp<
    DocumentsStackParamList,
    "OutgoingDocument"
  >;

type OutgoingDocumentRouteProp =
  RouteProp<
    DocumentsStackParamList,
    "OutgoingDocument"
  >;

const navigation =
  useNavigation<OutgoingDocumentNavigationProp>();

const route =
  useRoute<OutgoingDocumentRouteProp>();

  const { analysis } = route.params;
  
  const {
  title: aiTitle,
  subject: aiSubject,
  documentType: aiDocumentType,
} = analysis;

  const ocrText = route.params?.ocrText ?? "";
  const imageUri = route.params?.imageUri ?? "";
  const parsed = parseOcr(ocrText);
  console.log("=== PARSED ===");


async function handleCreate(
  data: ReceiveDocumentFormData
) {
  try {
    const now = new Date().toISOString();

    let imagePath: string | undefined;

    if (imageUri) {
      imagePath = await storageService.uploadImage(imageUri);
    }

    await documentService.addDocument({
      id: "",

      trackingNumber: generateTrackingNumber(),

      direction: "OUT",

      documentType: data.documentType,

      title: data.title,

      subject: data.subject,

      departmentFrom: "",

      destination: data.destination,

      processedBy: data.processedBy,

      receivedBy: "",

      status: DocumentStatus.PENDING,

      remarks: data.remarks ?? "",

      documentDate: now,

      ocrText,

      attachmentUrl: imageUri,

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
  console.error("Upload Error:", error);

  Alert.alert(
    "Upload Failed",
    error instanceof Error ? error.message : JSON.stringify(error)
  );
}
}

  return (
    <SafeScreen>
      <ScrollableScreen>
      <ScreenContainer>


        <AppHeader
          title="Outgoing Document"
          subtitle="Create a new outgoing document"
        />
      
        <DocumentForm
            direction="OUT"
            initialValues={{
            title: aiTitle || parsed.title,
            subject: aiSubject || parsed.subject,
            documentType: aiDocumentType,
        }}
            submitButtonTitle="Save Outgoing Document"
            onSubmit={handleCreate}
          />

      </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}