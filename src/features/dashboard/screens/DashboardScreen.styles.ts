import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  paddingTop: 20,
  justifyContent: "flex-start",
},

  skeleton: {
    gap: 16,
  },

  skeletonGreeting: {
    marginBottom: 8,
  },

  skeletonGreetingLine: {
    width: 112,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E2E8F0",
  },

  skeletonGreetingTitle: {
    width: 190,
    height: 26,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#CBD5E1",
  },

  skeletonMetrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },

  skeletonMetric: {
    width: "47%",
    height: 120,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
  },

  skeletonSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  skeletonSummaryItem: {
    flex: 1,
    height: 76,
    borderRadius: 14,
    backgroundColor: "#E2E8F0",
  },

  skeletonChart: {
    height: 210,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
  },

  skeletonSectionTitle: {
    width: 160,
    height: 22,
    borderRadius: 7,
    backgroundColor: "#CBD5E1",
  },

  skeletonDocument: {
    height: 88,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
  },
});