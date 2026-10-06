import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";

import {
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import { RootStackParamList } from "../../../navigation/navigation.types";

import { useRecipients } from "../hooks/useRecipients";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function RecipientManagementScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [searchQuery, setSearchQuery] = useState("");

  const {
    recipients,
    loading,
    error,
    refresh,
  } = useRecipients();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

 const filteredRecipients = useMemo(() => {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return recipients;
  }

  return recipients.filter((recipient) => {
    return (
      recipient.name.toLowerCase().includes(query) ||
      recipient.department.toLowerCase().includes(query)
    );
  });
}, [recipients, searchQuery]);

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
          Recipient Management
        </AppText>
      </View>
      

      {/* Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <ScreenContainer>
          {/* Add Recipient */}
          <AppButton
            title="+ Add Recipient"
            onPress={() =>
              navigation.navigate("AddRecipient")
            }
          />

          <View
                style={{
                  marginTop: 14,
                  marginBottom: 2,
                  position: "relative",
                }}
              >
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#9CA3AF"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 14,
                    zIndex: 1,
                  }}
                />

                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search recipient..."
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    height: 48,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 10,
                    paddingLeft: 44,
                    paddingRight: 14,
                    fontSize: 15,
                    color: "#111827",
                    backgroundColor: "#F9FAFB",
                  }}
                />
                </View>

          {/* Loading */}
          {loading ? (
            <View
              style={{
                flex: 1,
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
                Loading recipients...
              </AppText>
            </View>
          ) : error ? (
            /* Error */
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={48}
                color="#DC2626"
              />

              <AppText
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "center",
                }}
              >
                Unable to load recipients
              </AppText>

              <AppText
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                }}
              >
                {error}
              </AppText>

              <Pressable
                onPress={refresh}
                style={{
                  marginTop: 16,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: "#2563EB",
                }}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Try Again
                </AppText>
              </Pressable>
            </View>
          ) : recipients.length === 0 ? (
            /* Empty State */
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Ionicons
                name="people-outline"
                size={48}
                color="#9CA3AF"
              />

              <AppText
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                No recipients yet
              </AppText>

              <AppText
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                }}
              >
                Add a recipient to generate their
                personal QR code.
              </AppText>
            </View>
          ) : (
            /* Recipient List */
            <View
              style={{
                flex: 1,
                marginTop: 16,
              }}
            >
              {filteredRecipients.map((recipient) => (
                <View
                  key={recipient.id}
                  style={{
                    marginBottom: 10,
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {/* Recipient Information */}
                  <Pressable
                    onPress={() =>
                      navigation.navigate("RecipientQr", {
                        recipientId: recipient.id,
                      })
                    }
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {/* Avatar */}
                      <View
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 22,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#DBEAFE",
                        }}
                      >
                        <Ionicons
                          name="person-outline"
                          size={22}
                          color="#2563EB"
                        />
                      </View>

                      {/* Name + Department */}
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 12,
                        }}
                      >
                        <AppText
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#111827",
                          }}
                        >
                          {recipient.name}
                        </AppText>

                        <AppText
                          style={{
                            marginTop: 3,
                            fontSize: 14,
                            color: "#6B7280",
                          }}
                        >
                          {recipient.department}
                        </AppText>
                      </View>

                      {/* Status */}
                      <View
                        style={{
                          alignItems: "flex-end",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
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
                                  ? "#22C55E"
                                  : "#EF4444",
                            }}
                          />

                          <AppText
                            style={{
                              fontSize: 12,
                              color:
                                recipient.isActive
                                  ? "#16A34A"
                                  : "#DC2626",
                            }}
                          >
                            {recipient.isActive
                              ? "Active"
                              : "Inactive"}
                          </AppText>
                        </View>

                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#9CA3AF"
                          style={{
                            marginTop: 6,
                          }}
                        />
                      </View>
                    </View>
                  </Pressable>

                  {/* Edit Recipient */}
                  <Pressable
                    onPress={() =>
                      navigation.navigate("EditRecipient", {
                        recipientId: recipient.id,
                      })
                    }
                    style={({ pressed }) => ({
                      marginTop: 14,
                      paddingVertical: 10,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: pressed
                        ? "#DBEAFE"
                        : "#EFF6FF",
                      borderWidth: 1,
                      borderColor: "#BFDBFE",
                    })}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="create-outline"
                        size={18}
                        color="#2563EB"
                      />

                      <AppText
                        style={{
                          marginLeft: 6,
                          fontSize: 14,
                          fontWeight: "600",
                          color: "#2563EB",
                        }}
                      >
                        Edit Recipient
                      </AppText>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </ScreenContainer>
      </View>
    </SafeScreen>
  );
}