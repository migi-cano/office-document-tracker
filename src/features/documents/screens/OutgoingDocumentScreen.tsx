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

import {
  DocumentStatus,
} from "../types/document.types";

export default function OutgoingDocumentScreen() {
  const navigation = useNavigation();

  async function handleCreate(
    data: ReceiveDocumentFormData
  ) {
    const now = new Date().toISOString();

    await documentService.addDocument({
            id: "",

            trackingNumber: generateTrackingNumber(),

            documentType: "OUT",

            title: data.title,

            subject: data.subject,

            destination: data.destination,

            departmentFrom: "",

            processedBy: data.processedBy,

            receivedBy: "",

            status: DocumentStatus.PENDING,

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
            title="Outgoing Document"
            subtitle="Create a new outgoing document"
          />

          <DocumentForm
            documentType="OUT"
            submitButtonTitle="Save Outgoing Document"
            onSubmit={handleCreate}
            />
        </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}