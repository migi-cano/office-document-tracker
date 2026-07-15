import { FlatList } from "react-native";


import {AppText,EmptyState,} from "../../../components/common";

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

  const [search, setSearch] = useState("");

  const filteredDocuments = useMemo(() => {
  const keyword = search.toLowerCase();

  

  return documents.filter((document) => {
    return (
      document.subject
        .toLowerCase()
        .includes(keyword) ||

      document.trackingNumber
        .toLowerCase()
        .includes(keyword) ||

      document.sender
        .toLowerCase()
        .includes(keyword) ||

      document.receiver
        .toLowerCase()
        .includes(keyword)
    );
  });
}, [documents, search]);

  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
        title={`Documents (${filteredDocuments.length})`}
        subtitle="Office Document Tracker"
        />

        <SearchBar
  value={search}
  onChangeText={setSearch}
/>

        <FlatList
            data={filteredDocuments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <DocumentCard document={item} />
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
      </ScreenContainer>
    </SafeScreen>
  );
}