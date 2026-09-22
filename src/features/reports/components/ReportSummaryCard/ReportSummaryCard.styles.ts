import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 12,
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
});