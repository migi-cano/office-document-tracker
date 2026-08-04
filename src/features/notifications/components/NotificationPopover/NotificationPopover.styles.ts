import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  container: {
    position: "absolute",
    top: 70,
    right: 16,

    width: 340,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    overflow: "hidden",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.15,

    shadowRadius: 12,

    elevation: 10,
  },

  header: {
    padding: 16,

    borderBottomWidth: 1,

    borderBottomColor: "#E5E7EB",
  },

  title: {
    fontSize: 18,

    fontWeight: "700",
  },

  unread: {
    marginTop: 4,

    color: "#2563EB",
  },

  list: {
    maxHeight: 350,
  },

  footer: {
    padding: 14,

    borderTopWidth: 1,

    borderTopColor: "#E5E7EB",

    alignItems: "center",
  },

  viewAll: {
    color: "#2563EB",

    fontWeight: "700",
  },
});