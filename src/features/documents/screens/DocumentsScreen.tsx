import {
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { useMemo, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EmptyState } from "../../../components/common";
import {
  FilterModal,
  DocumentToolbar,
} from "../components";

import {
  DocumentCard,
  SearchBar,
} from "../../../components/business";
import { RouteProp } from "@react-navigation/native";
import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import { useDocuments } from "../hooks/useDocuments";
import { useDebounce } from "../../../hooks/useDebounce";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";
import { DocumentStatus } from "../types/document.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DocumentFilter } from "../types/document-filter.types";

type DocumentsRouteProps = RouteProp<
  DocumentsStackParamList,
  "DocumentsList"
>;

type DocumentsNavigationProp =
  NativeStackNavigationProp<DocumentsStackParamList>;


export default function DocumentsScreen() {
const navigation = useNavigation<DocumentsNavigationProp>();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

const route = useRoute<DocumentsRouteProps>();

const [filter, setFilter] = useState<DocumentFilter>(
  route.params?.filter ?? "ALL"
);

    const [filterVisible, setFilterVisible] =
  useState(false);

  const {
    documents,
    loading,
    refresh,
  } = useDocuments(debouncedSearch);


  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      switch (filter) {
        case "IN":
          return document.direction === "IN"

        case "OUT":
          return document.direction === "OUT"

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
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title={`${pageTitle} (${filteredDocuments.length})`}
          subtitle="Office Document Tracker"
        />

       <DocumentToolbar
            search={search}
            onSearchChange={setSearch}
            onFilterPress={() => setFilterVisible(true)}
        />

        <FlatList
            data={filteredDocuments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DocumentCard
                document={item}
                onPress={() =>
                  navigation.navigate("DocumentDetails", {
                    documentId: item.id,
                  })
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
            showsVerticalScrollIndicator={false}
          />


          <FilterModal
            visible={filterVisible}
            selectedFilter={filter}
            onSelect={setFilter}
            onClose={() => setFilterVisible(false)}
          />

          
      </ScreenContainer>
    </SafeScreen>
  );
}
