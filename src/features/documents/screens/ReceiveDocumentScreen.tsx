import { useNavigation } from "@react-navigation/native";

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



export default function ReceiveDocumentScreen() {
  const navigation = useNavigation();

 async function handleCreate(
  data: ReceiveDocumentFormData
) {
  const now = new Date().toISOString();

  await documentService.addDocument({
  id: "",

  trackingNumber: generateTrackingNumber(),

  documentType: "IN",

  title: data.title,

  subject: data.subject,

  departmentFrom: data.departmentFrom,

  destination: "",

  processedBy: "",

  receivedBy: data.receivedBy,

  status: DocumentStatus.RECEIVED,

  remarks: data.remarks ?? "",

  documentDate: now,

  ocrText: "",

  attachmentUrl: "",

  createdAt: now,

  updatedAt: now,
});

  navigation.goBack();
}

  return (
    <SafeScreen>
      <ScrollableScreen>
      <ScreenContainer>
        <AppHeader
          title="Receive Document"
          subtitle="Create a new incoming document"
        />

        <DocumentForm
          documentType="IN"
          submitButtonTitle="Save Incoming Document"
          onSubmit={handleCreate}
        />
      </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}