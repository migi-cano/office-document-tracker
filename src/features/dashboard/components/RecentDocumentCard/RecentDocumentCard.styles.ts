import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 16,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 6,

  elevation: 3,
},

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    marginRight: 12,
  },

  title: {
  flex: 1,
  fontSize: 16,
  fontWeight: "700",
  color: "#0F172A",
},

  trackingNumber: {
  fontSize: 13,
  color: "#244a96",
  marginTop: 6,
},

  statusBadge: {
  borderRadius: 20,
  paddingHorizontal: 14,
  paddingVertical: 6,
  alignSelf: "flex-start",
},

  statusText: {
  fontSize: 12,
  fontWeight: "600",
  textTransform: "uppercase",
},

  body: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: "#a0a5af",
},

 department: {
  flex: 1,
  fontSize: 14,
  color: "#374151",
  marginRight: 12,
},

  date: {
  fontSize: 13,
  color: "#9CA3AF",
  flexShrink: 0,
},

  titleRow: {
  flexDirection: "row",
  alignItems: "center",
},

icon: {
  width: 28,
  height: 28,
  resizeMode: "contain",
  marginRight: 8,
},
});