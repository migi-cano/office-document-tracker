import { useCallback, useState } from "react";
import {
  RouteProp,
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, FlatList } from "react-native";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
  ScrollableScreen,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import { DetailRow } from "../../../components/business";
import HistoryItem from "../../../components/business/HistoryItem";

import { documentService } from "../services/document.service";
import { Document } from "../types/document.types";

import {
  DocumentsStackParamList,
} from "../../../navigation/navigation.types";

import { useDocumentHistory } from "../history";

type RouteProps = RouteProp<
  DocumentsStackParamList,
  "DocumentDetails"
>;

type NavigationProps =
  NativeStackNavigationProp<
    DocumentsStackParamList,
    "DocumentDetails"
  >;

export default function DocumentDetailsScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();

  const [document, setDocument] =
    useState<Document>();

  const {
    history,
    refresh,
  } = useDocumentHistory(route.params.documentId);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const data =
          await documentService.getDocumentById(
            route.params.documentId
          );

        setDocument(data);

        await refresh();
      }

      load();
    }, [route.params.documentId, refresh])
  );

  if (!document) {
    return null;
  }

  async function handleDelete() {
    const currentDocument = document;

    if (!currentDocument) return;

    await documentService.deleteDocument(currentDocument.id);

    navigation.goBack();
  }

  function confirmDelete() {
    Alert.alert(
      "Delete Document",
      "Are you sure you want to delete this document?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDelete,
        },
      ]
    );
  }

  return (
    <SafeScreen>
      <ScrollableScreen>
        <ScreenContainer>

          <AppHeader title="Document Details" />

          <AppText>
            {document.trackingNumber}
          </AppText>

          <DetailRow
            label="Document Type"
            value={document.documentType}
          />

          <DetailRow
            label="Document Title"
            value={document.title}
          />

          <DetailRow
            label="Subject"
            value={document.subject}
          />

          {document.documentType === "IN" && (
            <>
              <DetailRow
                label="Department From"
                value={document.departmentFrom ?? ""}
              />

              <DetailRow
                label="Received By"
                value={document.receivedBy ?? ""}
              />
            </>
          )}

          {document.documentType === "OUT" && (
            <>
              <DetailRow
                label="Destination"
                value={document.destination ?? ""}
              />

              <DetailRow
                label="Processed By"
                value={document.processedBy ?? ""}
              />
            </>
          )}

          <DetailRow
            label="Status"
            value={document.status}
          />

          <DetailRow
            label="Remarks"
            value={document.remarks ?? ""}
          />

          <DetailRow
            label="Document Date"
            value={document.documentDate}
          />

          <AppButton
            title="Edit"
            onPress={() =>
              navigation.navigate("EditDocument", {
                documentId: document.id,
              })
            }
          />

          <AppButton
            title="Delete Document"
            onPress={confirmDelete}
          />

          <AppText
            variant="heading"
            style={{
              marginTop: 24,
              marginBottom: 12,
            }}
          >
            History
          </AppText>

          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <HistoryItem history={item} />
            )}
          />

        </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}