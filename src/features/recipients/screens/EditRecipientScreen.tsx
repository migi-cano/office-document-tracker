import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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

import { SafeScreen } from "../../../components/layout";
import { AppButton, AppInput, AppText } from "../../../components/common";
import { RootStackParamList } from "../../../navigation/navigation.types";

import { recipientService } from "../services/recipient.service";
import { Recipient } from "../types/recipient.types";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps = NativeStackScreenProps<
  RootStackParamList,
  "EditRecipient"
>;

export default function EditRecipientScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps["route"]>();

  const { recipientId } = route.params;

  const [recipient, setRecipient] = useState<Recipient | null>(null);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [nameError, setNameError] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadRecipient = async () => {
      try {
        setLoading(true);

        const data = await recipientService.getRecipientById(recipientId);

        setRecipient(data);
        setName(data.name);
        setDepartment(data.department);
        setIsActive(data.isActive);
      } catch (error) {
        console.error("Failed to load recipient:", error);

        Alert.alert(
          "Error",
          "Unable to load recipient.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipient();
  }, [recipientId, navigation]);

  const handleSave = async () => {
    setNameError("");
    setDepartmentError("");

    const trimmedName = name.trim();
    const trimmedDepartment = department.trim();

    let hasError = false;

    if (!trimmedName) {
      setNameError("Recipient name is required.");
      hasError = true;
    }

    if (!trimmedDepartment) {
      setDepartmentError("Department is required.");
      hasError = true;
    }

    if (hasError) return;

    try {
      setSaving(true);

      await recipientService.updateRecipient(recipientId, {
        name: trimmedName,
        department: trimmedDepartment,
        isActive,
      });

      Alert.alert(
        "Recipient Updated",
        `${trimmedName} has been updated successfully.`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Failed to update recipient:", error);

      Alert.alert(
        "Update Failed",
        "Unable to update recipient. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

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
            style={{ marginRight: 12 }}
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
            Edit Recipient
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
          style={{ marginRight: 12 }}
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
          Edit Recipient
        </AppText>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 40,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <AppText
                style={{
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Name
              </AppText>

              <AppInput
                placeholder="Enter recipient name"
                value={name}
                onChangeText={(text) => {
                  setName(text);

                  if (nameError) {
                    setNameError("");
                  }
                }}
                autoCapitalize="words"
                error={nameError}
              />
            </View>

            <View style={{ marginBottom: 24 }}>
              <AppText
                style={{
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Department
              </AppText>

              <AppInput
                placeholder="Enter department"
                value={department}
                onChangeText={(text) => {
                  setDepartment(text);

                  if (departmentError) {
                    setDepartmentError("");
                  }
                }}
                autoCapitalize="words"
                error={departmentError}
              />
            </View>

            <View style={{ marginBottom: 28 }}>
              <AppText
                style={{
                  marginBottom: 12,
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Recipient Status
              </AppText>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Pressable
                  onPress={() => setIsActive(true)}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: isActive
                      ? "#2563EB"
                      : "#D1D5DB",
                    backgroundColor: isActive
                      ? "#EFF6FF"
                      : "#FFFFFF",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: isActive
                        ? "#2563EB"
                        : "#6B7280",
                    }}
                  >
                    Active
                  </AppText>
                </Pressable>

                <Pressable
                  onPress={() => setIsActive(false)}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: !isActive
                      ? "#DC2626"
                      : "#D1D5DB",
                    backgroundColor: !isActive
                      ? "#FEF2F2"
                      : "#FFFFFF",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: !isActive
                        ? "#DC2626"
                        : "#6B7280",
                    }}
                  >
                    Inactive
                  </AppText>
                </Pressable>
              </View>
            </View>

            <AppButton
              title="Save Changes"
              loading={saving}
              onPress={handleSave}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeScreen>
  );
}