import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import QRCode from "react-native-qrcode-svg";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import { RootStackParamList } from "../../../navigation/navigation.types";

import { recipientService } from "../services/recipient.service";
import { Recipient } from "../types/recipient.types";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps = NativeStackScreenProps<
  RootStackParamList,
  "RecipientQr"
>;

export default function RecipientQrScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProps["route"]>();

  const { recipientId } = route.params;

  const [recipient, setRecipient] =
    useState<Recipient | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipient = async () => {
      try {
        setLoading(true);

        const data =
          await recipientService.getRecipientById(
            recipientId
          );

        setRecipient(data);
      } catch (error) {
        console.error(
          "Failed to load recipient:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to load recipient."
        );

        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadRecipient();
  }, [recipientId, navigation]);

  if (loading) {
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
            Recipient QR
          </AppText>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color="#2563EB"
          />

          <AppText
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Loading recipient...
          </AppText>
        </View>
      </SafeScreen>
    );
  }

  if (!recipient) {
    return null;
  }

  const qrValue =
    `ONENCR:RECIPIENT:${recipient.qrToken}`;

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      {/* HEADER */}
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
          Recipient QR
        </AppText>
      </View>

      {/* CONTENT */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <ScrollableScreen>
          <View
            style={{
              alignItems: "center",
              padding: 20,
            }}
          >
            {/* QR CODE */}
            <View
              style={{
                padding: 20,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <QRCode
                value={qrValue}
                size={240}
                backgroundColor="#FFFFFF"
                color="#000000"
              />
            </View>

            {/* NAME */}
            <AppText
              style={{
                marginTop: 24,
                fontSize: 22,
                fontWeight: "700",
                color: "#111827",
                textAlign: "center",
              }}
            >
              {recipient.name}
            </AppText>

            {/* DEPARTMENT */}
            <AppText
              style={{
                marginTop: 6,
                fontSize: 16,
                color: "#6B7280",
                textAlign: "center",
              }}
            >
              {recipient.department}
            </AppText>

            {/* ACTIVE STATUS */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 14,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor:
                  recipient.isActive
                    ? "#DCFCE7"
                    : "#FEE2E2",
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginRight: 6,
                  backgroundColor:
                    recipient.isActive
                      ? "#16A34A"
                      : "#DC2626",
                }}
              />

              <AppText
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color:
                    recipient.isActive
                      ? "#166534"
                      : "#991B1B",
                }}
              >
                {recipient.isActive
                  ? "Active Recipient"
                  : "Inactive Recipient"}
              </AppText>
            </View>

            {/* DESCRIPTION */}
            <AppText
              style={{
                marginTop: 24,
                fontSize: 14,
                lineHeight: 21,
                color: "#6B7280",
                textAlign: "center",
              }}
            >
              This QR code is permanently assigned
              to this recipient and can be used for
              document routing.
            </AppText>
          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}