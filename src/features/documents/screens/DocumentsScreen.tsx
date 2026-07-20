import { FlatList, View } from "react-native";
import {EmptyState,} from "../../../components/common";

import { useMemo, useState } from "react";

import {
  DocumentCard,
  SearchBar,
} from "../../../components/business";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import { useDocuments } from "../hooks/useDocuments";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DocumentsStackParamList } from "../../../navigation/navigation.types";
import { DocumentStatus } from "../types/document.types";
import StatCard from "../../../components/business/StatCard";




export default function DocumentsScreen() {
type DocumentsNavigationProp =
  NativeStackNavigationProp<DocumentsStackParamList>;

const navigation =
  useNavigation<DocumentsNavigationProp>();
 const {
  documents,
  loading,
  refresh,
} = useDocuments();

// Dashboard statistics
const incoming = documents.filter(
  (d) => d.documentType === "IN"
).length;

const outgoing = documents.filter(
  (d) => d.documentType === "OUT"
).length;

const pending = documents.filter(
  (d) => d.status === DocumentStatus.PENDING
).length;

const completed = documents.filter(
  (d) => d.status === DocumentStatus.COMPLETED
).length;

const [search, setSearch] = useState("");
const [filter, setFilter] =
  useState<"ALL" | "IN" | "OUT">("ALL");
const [statusFilter, setStatusFilter] =
  useState<DocumentStatus | "ALL">("ALL");

const filteredDocuments = useMemo(() => {
  const keyword = search.toLowerCase();

  return documents.filter((document) => {
    const matchesSearch =
      document.title.toLowerCase().includes(keyword) ||
      document.subject.toLowerCase().includes(keyword) ||
      document.trackingNumber
        .toLowerCase()
        .includes(keyword) ||
      (document.destination ?? "")
        .toLowerCase()
        .includes(keyword) ||
      (document.departmentFrom ?? "")
        .toLowerCase()
        .includes(keyword) ||
      (document.processedBy ?? "")
        .toLowerCase()
        .includes(keyword) ||
      (document.receivedBy ?? "")
        .toLowerCase()
        .includes(keyword);

    const matchesType =
      filter === "ALL" ||
      document.documentType === filter;

    const matchesStatus =
      statusFilter === "ALL" ||
      document.status === statusFilter;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    );
  });
}, [documents, search, filter, statusFilter]);


 return (
  <SafeScreen>
    <ScreenContainer>

      <AppHeader
        title={`${
          filter === "ALL"
            ? "All Documents"
            : filter === "IN"
            ? "Incoming Documents"
            : "Outgoing Documents"
        } (${filteredDocuments.length})`}
        subtitle="Office Document Tracker"
      />

      {/* Dashboard Statistics */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <StatCard
            title="Incoming"
            value={incoming}
            icon="📥"
            onPress={() => {
              setFilter("IN");
              setStatusFilter("ALL");
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <StatCard
            title="Outgoing"
            value={outgoing}
            icon="📤"
            onPress={() => {
              setFilter("OUT");
              setStatusFilter("ALL");
            }}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <StatCard
            title="Pending"
            value={pending}
            icon="⏳"
            onPress={() => {
              setFilter("ALL");
              setStatusFilter(DocumentStatus.PENDING);
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <StatCard
            title="Completed"
            value={completed}
            icon="✅"
            onPress={() => {
              setFilter("ALL");
              setStatusFilter(DocumentStatus.COMPLETED);
            }}
          />
        </View>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

        <FlatList
            data={filteredDocuments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <DocumentCard
                      document={item}
                      onPress={() =>
                          navigation.navigate(
                              "DocumentDetails",
                              {
                                  documentId: item.id,
                              }
                          )
                      }
                  />
            )}
            refreshing={loading}
            onRefresh={refresh}
           ListEmptyComponent={
                <EmptyState
                    title="No Documents Found"
                    description="Try searching with another keyword."
                />
                }
            />

            <Button
                title="Open Receive Document"
                onPress={() => navigation.navigate("ReceiveDocument")}
                />

                <Button
                    title="Open Outgoing Document"
                    onPress={() =>
                        navigation.navigate("OutgoingDocument")
                    }
                />
                
      </ScreenContainer>
    </SafeScreen>
  );
}