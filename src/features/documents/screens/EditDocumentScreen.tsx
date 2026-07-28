import { useEffect, useState } from "react";

import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
  ScrollableScreen,
} from "../../../components/layout";

import DocumentForm from "../components/DocumentForm";

import { documentService } from "../services/document.service";
import { formatDate } from "../../../utils/date";
import { Document } from "../types/document.types";

import {
  DocumentsStackParamList,
} from "../../../navigation/navigation.types";

import {
  ReceiveDocumentFormData,
} from "../validation/receiveDocument.schema";
import { Alert } from "react-native";
import { View } from "react-native";
import { styles } from "./EditDocumentScreen.styles";
import { AppText } from "../../../components";


type RouteProps = RouteProp<
  DocumentsStackParamList,
  "EditDocument"
>;

type NavigationProps = NativeStackNavigationProp<
  DocumentsStackParamList,
  "EditDocument"
>;

export default function EditDocumentScreen() {
  const route = useRoute<RouteProps>();
  const [document, setDocument] = useState<Document>();

  const navigation =
    useNavigation<NavigationProps>();

    

  useEffect(() => {
    async function load() {
      const data =
        await documentService.getDocumentById(
          route.params.documentId
        );

      setDocument(data);
    }

    load();
  }, [route.params.documentId]);

  async function handleUpdate(
  data: ReceiveDocumentFormData
) {
  if (!document) return;

  try {
    await documentService.updateDocument(document.id, {
      documentType: data.documentType,
      title: data.title,
      subject: data.subject,
      destination: data.destination,
      departmentFrom: data.departmentFrom,
      processedBy: data.processedBy,
      receivedBy: data.receivedBy,
      remarks: data.remarks,
    });

    navigation.navigate("DocumentsList", {});
  } catch (error) {
    Alert.alert(
      "Update Failed",
      "Unable to update the document. Please try again."
    );
  }
}

  if (!document) {
  return null;
}

const documentLabel =
  document.direction === "IN"
    ? "Incoming"
    : "Outgoing";

  return (
    <SafeScreen>
        <ScrollableScreen>  
      <ScreenContainer>
        
        <AppHeader
  title={`Edit ${documentLabel} Document`}
/>
        
        <View style={styles.infoCard}>
  <View style={styles.infoRow}>
    <AppText style={styles.label}>Tracking No.</AppText>
    <AppText>{document.trackingNumber}</AppText>
  </View>

  <View style={styles.infoRow}>
    <AppText style={styles.label}>Direction</AppText>
    <AppText>
      {document.direction === "IN"
        ? "Incoming"
        : "Outgoing"}
    </AppText>
  </View>

  <View style={styles.infoRow}>
    <AppText style={styles.label}>Status</AppText>
    <AppText>{document.status}</AppText>
  </View>

  <View style={styles.infoRow}>
    <AppText style={styles.label}>Type</AppText>
    <AppText>{document.documentType}</AppText>
  </View>

  <View style={styles.infoRow}>
    <AppText style={styles.label}>Document Date</AppText>
    <AppText>{formatDate(document.documentDate)}</AppText>
  </View>
</View>

          <DocumentForm
            direction={document.direction}
            initialValues={{
              title: document.title,
              documentType: document.documentType,
              subject: document.subject,
              destination: document.destination,
              departmentFrom: document.departmentFrom,
              processedBy: document.processedBy,
              receivedBy: document.receivedBy,
              remarks: document.remarks,
            }}
            submitButtonTitle="Update Document"
            onSubmit={handleUpdate}
          />
      </ScreenContainer>
        </ScrollableScreen>
    </SafeScreen>
  );
}