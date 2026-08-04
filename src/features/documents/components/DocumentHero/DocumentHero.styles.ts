import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 46,
    height: 46,
    marginRight: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  tracking: {
    marginTop: 4,
    fontSize: 14,
    color: "#2563EB",
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },

  badgeText: {
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
});