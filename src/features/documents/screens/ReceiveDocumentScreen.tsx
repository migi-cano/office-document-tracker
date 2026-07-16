import { useNavigation } from "@react-navigation/native";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import DocumentForm from "../components/DocumentForm";

import { documentService } from "../services/document.service";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";

import { ReceiveDocumentFormData } from "../validation/receiveDocument.schema";

export default function ReceiveDocumentScreen() {
  const navigation = useNavigation();

  async function handleCreate(
    data: ReceiveDocumentFormData
  ) {
    const now = new Date();

    await documentService.addDocument({
      id: Date.now().toString(),

      trackingNumber: generateTrackingNumber(),

      subject: data.subject,
      sender: data.sender,
      receiver: data.receiver,
      department: data.department,

      priority: "Normal",
      status: "Received",

      remarks: data.remarks ?? "",

      dateReceived: now.toISOString().split("T")[0],

      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });

    navigation.goBack();
  }

  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Receive Document"
          subtitle="Create a new incoming document"
        />

        <DocumentForm
          submitButtonTitle="Save Document"
          onSubmit={handleCreate}
        />
      </ScreenContainer>
    </SafeScreen>
  );
}