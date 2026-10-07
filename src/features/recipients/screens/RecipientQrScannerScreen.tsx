import { useState } from "react";

import { Alert, Pressable, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { CameraView, useCameraPermissions } from "expo-camera";

import { Ionicons } from "@expo/vector-icons";

import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import {
  DocumentsStackParamList,
} from "../../../navigation/navigation.types";

import { recipientService } from "../services/recipient.service";
import { documentService } from "../../documents/services/document.service";

import {
  Recipient,
} from "../types/recipient.types";

import {
  DocumentStatus,
} from "../../documents/types/document.types";

type NavigationProp =
  NativeStackNavigationProp<
    DocumentsStackParamList,
    "RecipientQrScanner"
  >;

type RouteProps = RouteProp<
  DocumentsStackParamList,
  "RecipientQrScanner"
>;

export default function RecipientQrScannerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const [permission, requestPermission] =
    useCameraPermissions();

  const [recipient, setRecipient] =
    useState<Recipient | null>(null);

  const [processing, setProcessing] =
    useState(false);

  const [releasing, setReleasing] =
    useState(false);

  const [scanned, setScanned] =
    useState(false);

  const handleBarcodeScanned = async ({
    data,
  }: {
    data: string;
  }) => {
    if (scanned || processing || releasing) {
      return;
    }

    setScanned(true);
    setProcessing(true);

    try {
      const prefix = "ONENCR:RECIPIENT:";

      if (!data.startsWith(prefix)) {
        throw new Error(
          "This is not a valid ONENCR recipient QR code."
        );
      }

      const qrToken = data
        .substring(prefix.length)
        .trim();

      if (!qrToken) {
        throw new Error(
          "The recipient QR code is missing its token."
        );
      }

      const foundRecipient =
        await recipientService.getRecipientByQrToken(
          qrToken
        );

      setRecipient(foundRecipient);
    } catch (error) {
      console.error(
        "Recipient QR scan failed:",
        error
      );

      Alert.alert(
        "Invalid Recipient",
        error instanceof Error
          ? error.message
          : "Unable to identify this recipient.",
        [
          {
            text: "Scan Again",
            onPress: () => {
              setRecipient(null);
              setScanned(false);
            },
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleConfirmRelease = async () => {
    if (!recipient || releasing) {
      return;
    }

    try {
      setReleasing(true);

      await documentService.updateStatus(
        route.params.documentId,
        DocumentStatus.RELEASED,
        recipient.id
      );

      navigation.goBack();
    } catch (error) {
      console.error(
        "Failed to release document:",
        error
      );

      Alert.alert(
        "Release Failed",
        error instanceof Error
          ? error.message
          : "Unable to release the document."
      );
    } finally {
      setReleasing(false);
    }
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <SafeScreen backgroundColor="#0D1233">
        <StatusBar style="light" />

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Ionicons
            name="camera-outline"
            size={56}
            color="#FFFFFF"
          />

          <AppText
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "700",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Camera Permission Required
          </AppText>

          <AppText
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#D1D5DB",
              textAlign: "center",
            }}
          >
            Camera access is required to scan the
            recipient QR code.
          </AppText>

          <AppButton
            title="Allow Camera"
            onPress={requestPermission}
            style={{
              marginTop: 24,
            }}
          />

          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginTop: 16,
              padding: 10,
            }}
          >
            <AppText
              style={{
                color: "#D1D5DB",
                fontSize: 14,
              }}
            >
              Cancel
            </AppText>
          </Pressable>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={{
            marginRight: 12,
          }}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <AppText
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          Scan Recipient
        </AppText>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <ScrollViewContent
          recipient={recipient}
          processing={processing}
          releasing={releasing}
          scanned={scanned}
          onBarcodeScanned={handleBarcodeScanned}
          onConfirmRelease={handleConfirmRelease}
          onScanAgain={() => {
            setRecipient(null);
            setScanned(false);
          }}
        />
      </View>
    </SafeScreen>
  );
}

function ScrollViewContent({
  recipient,
  processing,
  releasing,
  scanned,
  onBarcodeScanned,
  onConfirmRelease,
  onScanAgain,
}: {
  recipient: Recipient | null;
  processing: boolean;
  releasing: boolean;
  scanned: boolean;
  onBarcodeScanned: (result: {
    data: string;
  }) => void;
  onConfirmRelease: () => void;
  onScanAgain: () => void;
}) {
  return (
    <ScrollableScreen
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        {!recipient ? (
          <>
            <AppText
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
                textAlign: "center",
              }}
            >
              Scan Recipient QR Code
            </AppText>

            <AppText
              style={{
                marginTop: 6,
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
              }}
            >
              Position the recipient's QR code inside
              the frame.
            </AppText>

            <View
              style={{
                marginTop: 24,
                height: 320,
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: "#111827",
              }}
            >
              <CameraView
                style={{
                  flex: 1,
                }}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={
                  scanned
                    ? undefined
                    : onBarcodeScanned
                }
              />

              <View
                style={{
                  position: "absolute",
                  left: 40,
                  right: 40,
                  top: 50,
                  bottom: 50,
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                  borderRadius: 12,
                }}
              />
            </View>

            {processing ? (
              <AppText
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "#2563EB",
                  textAlign: "center",
                }}
              >
                Checking recipient...
              </AppText>
            ) : null}
          </>
        ) : (
          <>
            <View
              style={{
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#DCFCE7",
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={36}
                  color="#16A34A"
                />
              </View>

              <AppText
                style={{
                  marginTop: 16,
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Recipient Found
              </AppText>

              <AppText
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                Verify the recipient before releasing.
              </AppText>
            </View>

            <View
              style={{
                marginTop: 12,
                padding: 18,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 12,
                backgroundColor: "#FFFFFF",
              }}
            >
              <AppText
                style={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Recipient
              </AppText>

              <AppText
                style={{
                  marginTop: 4,
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {recipient.name}
              </AppText>

              <AppText
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                {recipient.department}
              </AppText>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#22C55E",
                    marginRight: 6,
                  }}
                />

                <AppText
                  style={{
                    fontSize: 13,
                    color: "#16A34A",
                  }}
                >
                  Active recipient
                </AppText>
              </View>
            </View>

            <AppButton
              title={
                releasing
                  ? "Releasing..."
                  : "Confirm Release"
              }
              onPress={onConfirmRelease}
              disabled={releasing}
              style={{
                marginTop: 24,
              }}
            />

            <Pressable
              onPress={onScanAgain}
              disabled={releasing}
              style={{
                marginTop: 12,
                alignItems: "center",
                paddingVertical: 12,
              }}
            >
              <AppText
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: releasing
                    ? "#9CA3AF"
                    : "#2563EB",
                }}
              >
                Scan Different Recipient
              </AppText>
            </Pressable>
          </>
        )}
      </View>
    </ScrollableScreen>
  );
}