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

  row: {
    marginBottom: 16,
  },

  rowLast: {
    marginBottom: 0,
  },

  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    color: "#374151",
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 4,
  },
});