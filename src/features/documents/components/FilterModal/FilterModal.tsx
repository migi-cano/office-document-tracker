import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { DocumentFilter } from "../../types/document-filter.types";

interface FilterModalProps {
  visible: boolean;
  selectedFilter: DocumentFilter;
  onSelect: (filter: DocumentFilter) => void;
  onClose: () => void;
}

export default function FilterModal({
  visible,
  selectedFilter,
  onSelect,
  onClose,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>
            Filter Documents
          </Text>

          <Pressable
            style={styles.option}
            onPress={() => {
              onSelect("ALL");
              onClose();
            }}
          >
            <Text style={styles.label}>All</Text>

            {selectedFilter === "ALL" && (
              <Ionicons
                name="checkmark"
                size={22}
                color="#2563EB"
              />
            )}
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              onSelect("IN");
              onClose();
            }}
          >
            <Text style={styles.label}>Incoming</Text>

            {selectedFilter === "IN" && (
              <Ionicons
                name="checkmark"
                size={22}
                color="#2563EB"
              />
            )}
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              onSelect("OUT");
              onClose();
            }}
          >
            <Text style={styles.label}>Outgoing</Text>

            {selectedFilter === "OUT" && (
              <Ionicons
                name="checkmark"
                size={22}
                color="#2563EB"
              />
            )}
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              onSelect("PENDING");
              onClose();
            }}
          >
            <Text style={styles.label}>Pending</Text>

            {selectedFilter === "PENDING" && (
              <Ionicons
                name="checkmark"
                size={22}
                color="#2563EB"
              />
            )}
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              onSelect("COMPLETED");
              onClose();
            }}
          >
            <Text style={styles.label}>Completed</Text>

            {selectedFilter === "COMPLETED" && (
              <Ionicons
                name="checkmark"
                size={22}
                color="#2563EB"
              />
            )}
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  container: {
    backgroundColor: "#FFF",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  label: {
    fontSize: 16,
  },

  cancelButton: {
    marginTop: 24,
    alignItems: "center",
  },

  cancelText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 16,
  },
});