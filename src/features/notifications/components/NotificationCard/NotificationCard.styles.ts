import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",

    padding: 16,

    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  unread: {
    backgroundColor: "#F8FAFF",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111827",
  },

  message: {
    marginTop: 2,
    color: "#6B7280",
    fontSize: 14,
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#9CA3AF",
  },
});