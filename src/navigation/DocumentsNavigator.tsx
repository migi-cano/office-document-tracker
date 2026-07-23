import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DocumentsScreen from "../features/documents/screens/DocumentsScreen";
import ReceiveDocumentScreen from "../features/documents/screens/ReceiveDocumentScreen";
import DocumentDetailsScreen from "../features/documents/screens/DocumentDetailsScreen";

import { DocumentsStackParamList } from "./navigation.types";
import EditDocumentScreen from "../features/documents/screens/EditDocumentScreen";
import OutgoingDocumentScreen from "../features/documents/screens/OutgoingDocumentScreen";
import DocumentPreviewScreen from "../features/documents/screens/DocumentPreviewScreen";

const Stack = createNativeStackNavigator<DocumentsStackParamList>();

export default function DocumentsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen
    name="DocumentsList"
    component={DocumentsScreen}
  />

  <Stack.Screen
  name="DocumentPreview"
  component={DocumentPreviewScreen}
  />

  <Stack.Screen
    name="ReceiveDocument"
    component={ReceiveDocumentScreen}
  />

  <Stack.Screen
    name="OutgoingDocument"
    component={OutgoingDocumentScreen}
  />

  <Stack.Screen
    name="DocumentDetails"
    component={DocumentDetailsScreen}
  />

  <Stack.Screen
    name="EditDocument"
    component={EditDocumentScreen}
  />
</Stack.Navigator>
    
  );
}