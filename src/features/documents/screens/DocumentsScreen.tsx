import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  View,
} from "react-native";
import { useMemo, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import {
  EmptyState,
  AppText,
} from "../../../components/common";

import {
  FilterModal,
  DocumentToolbar,
  DocumentsHeader,
} from "../components";

import { DocumentCard } from "../../../components/business";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import { useDocuments } from "../hooks/useDocuments";
import { useDebounce } from "../../../hooks/useDebounce";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";
import { DocumentStatus } from "../types/document.types";
import { DocumentFilter } from "../types/document-filter.types";
import { useRealtimeDocuments } from "../../../hooks/useRealtimeDocuments";
import { styles } from "./DocumentsScreen.styles";

type DocumentsNavigationProp =
  NativeStackNavigationProp<DocumentsStackParamList>;

export default function DocumentsScreen() {
  const navigation =
    useNavigation<DocumentsNavigationProp>();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [filter, setFilter] =
    useState<DocumentFilter>("ALL");

  const [filterVisible, setFilterVisible] =
    useState(false);

  const {
    documents,
    loading,
    refresh,
  } = useDocuments(debouncedSearch);

  useRealtimeDocuments(refresh);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      switch (filter) {
        case "IN":
          return document.direction === "IN";

        case "OUT":
          return document.direction === "OUT";

        case "PENDING":
          return document.status === DocumentStatus.PENDING;

        case "RELEASED":
          return document.status === DocumentStatus.RELEASED;

        case "COMPLETED":
          return document.status === DocumentStatus.COMPLETED;

        default:
          return true;
      }
    });
  }, [documents, filter]);

  const pageTitle = {
    ALL: "All Documents",
    IN: "Incoming Documents",
    OUT: "Outgoing Documents",
    PENDING: "Pending Documents",
    RELEASED: "Released Documents",
    COMPLETED: "Completed Documents",
  }[filter];

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <DocumentsHeader title="Documents" />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <AppText style={styles.pageTitle}>
              {pageTitle} ({filteredDocuments.length})
            </AppText>

            <DocumentToolbar
              search={search}
              onSearchChange={setSearch}
              onFilterPress={() =>
                setFilterVisible(true)
              }
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
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollableScreen>
      </View>

      <FilterModal
        visible={filterVisible}
        selectedFilter={filter}
        onSelect={setFilter}
        onClose={() =>
          setFilterVisible(false)
        }
      />
    </SafeScreen>
  );
}