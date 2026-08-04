import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 18,
    marginRight: 10,
  },

  label: {
    fontSize: 15,
    color: "#475569",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});