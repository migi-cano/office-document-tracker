import { useEffect, useState } from "react";
import {RouteProp,useRoute,useFocusEffect,} from "@react-navigation/native";
import { useCallback } from "react";
import {AppHeader,SafeScreen,ScreenContainer,} from "../../../components/layout";
import {AppText,} from "../../../components/common";
import { documentService } from "../services/document.service";
import { Document } from "../types/document.types";
import { DocumentsStackParamList } from "../../../navigation/navigation.types";
import { DetailRow } from "../../../components/business";
import { AppButton } from "../../../components/common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";

type RouteProps =
    RouteProp<
        DocumentsStackParamList,
        "DocumentDetails"
    >;

type NavigationProps = NativeStackNavigationProp<
  DocumentsStackParamList,
  "DocumentDetails"
>;

export default function DocumentDetailsScreen() {
    const route = useRoute<RouteProps>();
    const navigation = useNavigation<NavigationProps>();

    const [document, setDocument] =
        useState<Document>();

    useFocusEffect(
      useCallback(() => {
        async function load() {
          const data =
            await documentService.getDocumentById(
              route.params.documentId
            );

          setDocument(data);
        }

        load();
      }, [route.params.documentId])
    );

    if (!document) {
        return null;
    }
    async function handleDelete() {
        if (!document) return;

        await documentService.deleteDocument(document.id);

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
            <ScreenContainer>

                <AppHeader
                    title="Document Details"
                />

                <AppText>
                    {document.trackingNumber}
                </AppText>

                <DetailRow
                  label="Subject"
                  value={document.subject}
                />

                <DetailRow
                  label="Sender"
                  value={document.sender}
                />

                <DetailRow
                  label="Receiver"
                  value={document.receiver}
                />

                <DetailRow
                  label="Department"
                  value={document.department}
                />

                <DetailRow
                  label="Priority"
                  value={document.priority}
                />

                <DetailRow
                  label="Remarks"
                  value={document.remarks}
                />

                <DetailRow
                  label="Date Received"
                  value={document.dateReceived}
                />

                <AppText>
                    {document.sender}
                </AppText>

                <AppText>
                    {document.receiver}
                </AppText>

                <AppText>
                    {document.department}
                </AppText>

                <AppText>
                    {document.priority}
                </AppText>

                <AppText>
                    {document.status}
                </AppText>

                <AppText>
                    {document.remarks}
                </AppText>

                <AppButton
                    title="Edit"
                    onPress={() =>
                        navigation.navigate(
                            "EditDocument",
                            {
                                documentId: document.id,
                            }
                        )
                    }
                />

        <AppButton
          title="Delete Document"
          onPress={confirmDelete}
        />

            </ScreenContainer>
        </SafeScreen>
    );
}