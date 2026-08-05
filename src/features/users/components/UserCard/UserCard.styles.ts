import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },

  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  email: {
    marginLeft: 8,
    color: "#6B7280",
    fontSize: 14,
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});