import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  created: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  action: {
    fontSize: 20,
  },
});