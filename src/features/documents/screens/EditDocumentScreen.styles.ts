import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  pageTitle: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  infoCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  label: {
    flex: 1,
    color: "#374151",
    fontWeight: "600",
  },
});