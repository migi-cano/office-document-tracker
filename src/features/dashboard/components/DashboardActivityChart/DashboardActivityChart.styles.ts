import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },

  chartCard: {
  marginTop: 5,
  marginBottom: 5,

  backgroundColor: "#FFFFFF",
  borderRadius: 20,

  paddingVertical: 16,
  paddingHorizontal: 5,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
},

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "600",
  },

  chartContainer: {
  overflow: "hidden",
  borderRadius: 10,
  alignContent: "center"
},

  chart: {
    borderRadius: 16,
  },

  summary: {
    borderBottomWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 15,
    paddingBottom: 15,
  },

  summaryLabel: {
    fontSize: 13,
    color: "#64748B",
  },

  summaryValue: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
});