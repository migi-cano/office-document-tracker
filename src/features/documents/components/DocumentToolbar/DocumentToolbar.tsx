import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SearchBar } from "../../../../components/business";

interface DocumentToolbarProps {
  search: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
}

export default function DocumentToolbar({
  search,
  onSearchChange,
  onFilterPress,
}: DocumentToolbarProps) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <SearchBar
          value={search}
          onChangeText={onSearchChange}
        />
      </View>

      <Pressable
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <Ionicons
          name="filter"
          size={22}
          color="#374151"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  filterButton: {
    width: 48,
    height: 48, // Match your SearchBar height
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
  },
});