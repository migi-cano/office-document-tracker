import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Image } from "react-native";
import { storageService } from "../services/storage.service";
import {
  RouteProp,
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import {
  formatDateTime,
} from "../../../utils/date";
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
import { styles } from "./DocumentDetailsScreen.styles";
import { View } from "react-native";

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
  const [imageUrl, setImageUrl] = useState<string>();

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

  useEffect(() => {
      async function loadImage() {
        if (!document?.imagePath) {
          setImageUrl(undefined);
          return;
        }

        try {
          const url = await storageService.getSignedUrl(
            document.imagePath
          );

          setImageUrl(url);
        } catch (error) {
          console.error("Failed to load image:", error);
        }
      }

      loadImage();
    }, [document?.imagePath]);

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

          <View style={styles.section}>
             <AppText
                variant="heading"
                style={styles.sectionTitle}
              >
                Document Information
              </AppText>

              <DetailRow
                label="Document Type"
                value={document.documentType}
              />

              <DetailRow
                label="Direction"
                value={document.direction === "IN" ? "Incoming" : "Outgoing"}
              />

              <DetailRow
                label="Title"
                value={document.title}
              />

              <DetailRow
                label="Subject"
                value={document.subject}
              />

              <DetailRow
                label="Status"
                value={document.status}
              />

              <DetailRow
                label="Date"
                value={formatDateTime(document.documentDate)}
              />
            </View>
          
            {/* Scanned Document */}
            {imageUrl && (
              <View style={styles.section}>
                <AppText
                  variant="heading"
                  style={styles.sectionTitle}
                >
                  Scanned Document
                </AppText>

                <Image
                  source={{ uri: imageUrl }}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            )}

            {/* Additional Information */}
            <View style={styles.section}>
              <AppText
                variant="heading"
                style={styles.sectionTitle}
              >
                Additional Information
              </AppText>

              <DetailRow
                label="Tracking Number"
                value={document.trackingNumber}
              />

              {document.direction === "IN" ? (
                <>
                  <DetailRow
                    label="Department From"
                    value={document.departmentFrom ?? "-"}
                  />

                  <DetailRow
                    label="Received By"
                    value={document.receivedBy ?? "-"}
                  />
                </>
              ) : (
                <>
                  <DetailRow
                    label="Destination"
                    value={document.destination ?? "-"}
                  />

                  <DetailRow
                    label="Processed By"
                    value={document.processedBy ?? "-"}
                  />
                </>
              )}

              <DetailRow
                label="Remarks"
                value={document.remarks ?? "-"}
              />
            </View>

            {/* Actions */}
            <View style={styles.section}>
              {getNextStatus() && (
                <AppButton
                  title={getStatusButtonTitle()}
                  onPress={handleStatusUpdate}
                  disabled={updatingStatus}
                  variant="primary"
                />
              )}

              <AppButton
                title="Edit"
                onPress={() =>
                  navigation.navigate("EditDocument", {
                    documentId: document.id,
                  })
                }
                variant="secondary"
              />

              <AppButton
                title="Delete Document"
                onPress={confirmDelete}
                variant="danger"
              />
            </View>

            {/* History */}
            <View style={styles.section}>
              <AppText
                variant="heading"
                style={styles.sectionTitle}
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
            </View>

        </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}