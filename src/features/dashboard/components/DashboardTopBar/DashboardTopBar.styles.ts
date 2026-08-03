import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D1233",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#F59E0B",

    justifyContent: "center",
    alignItems: "center",
  },

  initials: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});