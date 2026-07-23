import { Image, View } from "react-native";
import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";

import {
  SafeScreen,
  ScreenContainer,
  ScrollableScreen,
  AppHeader,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DocumentPreviewRouteProp = RouteProp<
  DocumentsStackParamList,
  "DocumentPreview"
>;

export default function DocumentPreviewScreen() {

type DocumentPreviewNavigationProp =
  NativeStackNavigationProp<
    DocumentsStackParamList,
    "DocumentPreview"
  >;

  const navigation =
  useNavigation<DocumentPreviewNavigationProp>();
  const route = useRoute<DocumentPreviewRouteProp>();

  const { imageUri, ocrText, analysis } = route.params;

  return (
    <SafeScreen>
      <ScrollableScreen>
        <ScreenContainer>

          <AppHeader
            title="Document Preview"
            subtitle="Review the extracted information"
          />

          <Image
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: 250,
              borderRadius: 12,
            }}
            resizeMode="contain"
          />

          <View style={{ marginTop: 20 }}>

            <AppText>
              <AppText style={{ fontWeight: "bold" }}>
                Document Type:
              </AppText>{" "}
              {analysis.documentType}
            </AppText>

            <AppText style={{ marginTop: 10 }}>
              <AppText style={{ fontWeight: "bold" }}>
                Title:
              </AppText>{" "}
              {analysis.title}
            </AppText>

            <AppText style={{ marginTop: 10 }}>
              <AppText style={{ fontWeight: "bold" }}>
                Subject:
              </AppText>{" "}
              {analysis.subject}
            </AppText>

          </View>

          <View style={{ marginTop: 30 }}>

            <AppButton
            title="Incoming Document"
            onPress={() =>
                navigation.navigate("ReceiveDocument", {
                imageUri,
                ocrText,
                analysis,
                })
            }
            />

            <AppButton
            title="Outgoing Document"
            onPress={() =>
                navigation.navigate("OutgoingDocument", {
                imageUri,
                ocrText,
                analysis,
                })
            }
            />

          </View>

        </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}