import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DocumentsScreen from "../features/documents/screens/DocumentsScreen";
import ReceiveDocumentScreen from "../features/documents/screens/ReceiveDocumentScreen";
import DocumentDetailsScreen from "../features/documents/screens/DocumentDetailsScreen";

import { DocumentsStackParamList } from "./navigation.types";

const Stack = createNativeStackNavigator<DocumentsStackParamList>();

export default function DocumentsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DocumentsList"
        component={DocumentsScreen}
      />

      <Stack.Screen
        name="ReceiveDocument"
        component={ReceiveDocumentScreen}
      />

      <Stack.Screen
        name="DocumentDetails"
        component={DocumentDetailsScreen}
      />
    </Stack.Navigator>
  );
}