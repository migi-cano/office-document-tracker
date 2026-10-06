import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import {
  AppButton,
  AppInput,
  AppText,
} from "../../../components/common";

import { RootStackParamList } from "../../../navigation/navigation.types";

import { useCreateRecipient } from "../hooks/useCreateRecipient";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function AddRecipientScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { createRecipient, loading, error } =
    useCreateRecipient();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const [nameError, setNameError] = useState("");
  const [departmentError, setDepartmentError] =
    useState("");

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
      setDepartmentError(
        "Department is required."
      );
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const recipient = await createRecipient({
      name: trimmedName,
      department: trimmedDepartment,
    });

    if (!recipient) {
      return;
    }

    Alert.alert(
      "Recipient Created",
      `${recipient.name} has been added successfully.`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <AppText
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          Add Recipient
        </AppText>
      </View>

      {/* Content */}
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
            {/* Name */}
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

            {/* Department */}
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

            {error ? (
              <AppText
                style={{
                  marginBottom: 16,
                  fontSize: 13,
                  color: "#DC2626",
                }}
              >
                {error}
              </AppText>
            ) : null}

            {/* Save */}
            <AppButton
              title="Save Recipient"
              loading={loading}
              onPress={handleSave}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeScreen>
  );
}