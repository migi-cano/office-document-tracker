import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  options: {
    flexDirection: "row",
    gap: 8,
  },

  option: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  optionActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  optionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },

  optionTextActive: {
    color: "#FFFFFF",
  },
});