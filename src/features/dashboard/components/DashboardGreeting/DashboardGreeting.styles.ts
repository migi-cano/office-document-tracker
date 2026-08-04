import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
},

leftContent: {
  flex: 1,
  alignItems: "flex-start",
},

  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },

  badge: {
  position: "absolute",
  top: -4,
  right: -4,
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: "#EF4444",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 4,
},

badgeText: {
  color: "#FFFFFF",
  fontSize: 10,
  fontWeight: "700",
},
});