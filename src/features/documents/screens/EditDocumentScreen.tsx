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

    await documentService.updateDocument(
      document.id,
      {
        subject: data.subject,
        sender: data.sender,
        receiver: data.receiver,
        department: data.department,
        remarks: data.remarks,
      }
    );

    navigation.goBack();
  }

  if (!document) {
    return null;
  }

  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Edit Document"
        />

        <DocumentForm
          initialValues={{
            subject: document.subject,
            sender: document.sender,
            receiver: document.receiver,
            department: document.department,
            remarks: document.remarks,
          }}
          submitButtonTitle="Update Document"
          onSubmit={handleUpdate}
        />
      </ScreenContainer>
    </SafeScreen>
  );
}