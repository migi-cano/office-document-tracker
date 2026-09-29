import { Image, Pressable, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";

import { styles } from "./DocumentPreviewScreen.styles";

type DocumentPreviewRouteProp = RouteProp<
  DocumentsStackParamList,
  "DocumentPreview"
>;

type DocumentPreviewNavigationProp =
  NativeStackNavigationProp<
    DocumentsStackParamList,
    "DocumentPreview"
  >;

export default function DocumentPreviewScreen() {
  const navigation =
    useNavigation<DocumentPreviewNavigationProp>();

  const route =
    useRoute<DocumentPreviewRouteProp>();

  const {
    imageUri,
    ocrText,
    analysis,
  } = route.params;

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle}>
          Document Preview
        </AppText>
      </View>

      {/* Content */}
      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            {/* Document Image */}
            <View style={styles.imageCard}>
              <Image
                source={{ uri: imageUri }}
                style={styles.documentImage}
                resizeMode="contain"
              />
            </View>

            {/* Document Information */}
            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>
                Extracted Information
              </AppText>

              <View style={styles.infoCard}>

                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color="#2563EB"
                    />
                  </View>

                  <View style={styles.infoContent}>
                    <AppText style={styles.infoLabel}>
                      Document Type
                    </AppText>

                    <AppText style={styles.infoValue}>
                      {analysis.documentType || "Not identified"}
                    </AppText>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="text-outline"
                      size={20}
                      color="#2563EB"
                    />
                  </View>

                  <View style={styles.infoContent}>
                    <AppText style={styles.infoLabel}>
                      Title
                    </AppText>

                    <AppText style={styles.infoValue}>
                      {analysis.title || "Not identified"}
                    </AppText>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="pricetag-outline"
                      size={20}
                      color="#2563EB"
                    />
                  </View>

                  <View style={styles.infoContent}>
                    <AppText style={styles.infoLabel}>
                      Subject
                    </AppText>

                    <AppText style={styles.infoValue}>
                      {analysis.subject || "Not identified"}
                    </AppText>
                  </View>
                </View>

              </View>
            </View>

            {/* Document Routing */}
            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>
                Document Routing
              </AppText>

              <AppText style={styles.sectionDescription}>
                Select how this document will be recorded.
              </AppText>

              <View style={styles.actionCard}>

                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                  ]}
                  onPress={() =>
                    navigation.navigate(
                      "ReceiveDocument",
                      {
                        imageUri,
                        ocrText,
                        analysis,
                      }
                    )
                  }
                >
                  <View style={styles.actionIconIncoming}>
                    <Ionicons
                      name="arrow-down-outline"
                      size={22}
                      color="#2563EB"
                    />
                  </View>

                  <View style={styles.actionContent}>
                    <AppText style={styles.actionTitle}>
                      Incoming Document
                    </AppText>

                    <AppText style={styles.actionDescription}>
                      Record a document received by the office.
                    </AppText>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#9CA3AF"
                  />
                </Pressable>

                <View style={styles.actionDivider} />

                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                  ]}
                  onPress={() =>
                    navigation.navigate(
                      "OutgoingDocument",
                      {
                        imageUri,
                        ocrText,
                        analysis,
                      }
                    )
                  }
                >
                  <View style={styles.actionIconOutgoing}>
                    <Ionicons
                      name="arrow-up-outline"
                      size={22}
                      color="#16A34A"
                    />
                  </View>

                  <View style={styles.actionContent}>
                    <AppText style={styles.actionTitle}>
                      Outgoing Document
                    </AppText>

                    <AppText style={styles.actionDescription}>
                      Record a document sent by the office.
                    </AppText>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#9CA3AF"
                  />
                </Pressable>

              </View>
            </View>

            <View style={styles.bottomSpacing} />

          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}