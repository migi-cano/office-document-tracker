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



export default function ReceiveDocumentScreen() {
  const navigation = useNavigation();

  type ReceiveDocumentRouteProp = RouteProp<
  DocumentsStackParamList,
  "ReceiveDocument"
>;

  const route = useRoute<ReceiveDocumentRouteProp>();



  const ocrText = route.params?.ocrText ?? "";
  console.log("=== RECEIVE SCREEN ===");
console.log(route.params);
console.log(ocrText);
  const imageUri = route.params?.imageUri ?? "";
  const parsed = parseOcr(ocrText);
  console.log("=== PARSED ===");
console.log(parsed);

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

  ocrText,

  attachmentUrl: imageUri,

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
           initialValues={{
          title: parsed.title,
          subject: parsed.subject,
        }}
            submitButtonTitle="Save Incoming Document"
            onSubmit={handleCreate}
          />

      </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}