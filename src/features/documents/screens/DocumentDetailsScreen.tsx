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
import {
  Document,
  DocumentStatus,
} from "../types/document.types";

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
  const [updatingStatus, setUpdatingStatus] = useState(false);

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

 function getNextStatus(): DocumentStatus | null {
  if (!document) return null;

  if (document.direction === "OUT") {
    switch (document.status) {
      case DocumentStatus.PENDING:
        return DocumentStatus.RELEASED;

      case DocumentStatus.RELEASED:
        return DocumentStatus.COMPLETED;

      default:
        return null;
    }
  }

  if (document.direction === "IN") {
    switch (document.status) {
      case DocumentStatus.RECEIVED:
        return DocumentStatus.COMPLETED;

      default:
        return null;
    }
  }

  return null;
}

function getStatusButtonTitle() {
  if (!document) return "";

  if (document.direction === "OUT") {
    switch (document.status) {
      case DocumentStatus.PENDING:
        return "Release Document";

      case DocumentStatus.RELEASED:
        return "Complete Document";

      default:
        return "";
    }
  }

  if (document.direction === "IN") {
    switch (document.status) {
      case DocumentStatus.RECEIVED:
        return "Complete Document";

      default:
        return "";
    }
  }

  return "";
}

async function handleStatusUpdate() {
  if (!document) return;

  const nextStatus = getNextStatus();

  if (!nextStatus) return;

  const updated = await documentService.updateStatus(
    document.id,
    nextStatus
  );

  setDocument(updated);

  await refresh();
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
            value={document.direction}
          />

          <DetailRow
            label="Document Title"
            value={document.title}
          />

          <DetailRow
            label="Subject"
            value={document.subject}
          />

          {document.direction === "IN" && (
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

          {document.direction === "OUT" && (
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

          {getNextStatus() && (
            <AppButton
              title={getStatusButtonTitle()}
              onPress={handleStatusUpdate}
              disabled={updatingStatus}
            />
          )}

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