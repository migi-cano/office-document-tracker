import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },

  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 180,
  },

  barColumn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  barValue: {
    marginBottom: 4,
    fontSize: 10,
    color: "#6B7280",
  },

  bar: {
    width: 18,
    minHeight: 2,
    borderRadius: 4,
    backgroundColor: "#2563EB",
  },

  monthLabel: {
    marginTop: 8,
    fontSize: 10,
    color: "#6B7280",
  },

  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    paddingVertical: 20,
  },
});