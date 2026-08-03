import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,

    minHeight: 120,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 12,
  },

  value: {
    fontSize: 40,
    fontWeight: "700",
    color: "#111827",
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 35,
    height: 35,
},
});