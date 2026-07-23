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

import { Document } from "../types/document.types";

import {
  DocumentsStackParamList,
} from "../../../navigation/navigation.types";

import {
  ReceiveDocumentFormData,
} from "../validation/receiveDocument.schema";

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

  const navigation =
    useNavigation<NavigationProps>();

  const [document, setDocument] =
    useState<Document>();

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

await documentService.updateDocument(document.id, {
  title: data.title,

  subject: data.subject,

  destination: data.destination,

  departmentFrom: data.departmentFrom,

  processedBy: data.processedBy,

  receivedBy: data.receivedBy,

  remarks: data.remarks,
});

    navigation.goBack();
  }

  if (!document) {
    return null;
  }

  return (
    <SafeScreen>
        <ScrollableScreen>  
      <ScreenContainer>
        <AppHeader
          title="Edit Document"
        />

        <DocumentForm
          direction={document.direction}
          initialValues={{
          title: document.title,
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