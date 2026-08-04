import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 12,

    backgroundColor: "#F9FAFB",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 6,
    fontWeight: "700",
    fontSize: 16,
  },

  count: {
    color: "#6B7280",
  },
});