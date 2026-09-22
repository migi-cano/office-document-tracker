import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  trafficSection: {
    marginBottom: 24,
  },

  trafficSectionLast: {
    marginBottom: 0,
  },

  trafficHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  trafficTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
  },

  seeMore: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  row: {
    marginBottom: 16,
  },

  rowLast: {
    marginBottom: 0,
  },

  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  name: {
    flex: 1,
    fontSize: 13,
    color: "#374151",
    marginRight: 12,
  },

  count: {
    minWidth: 28,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 4,
  },

  incomingFill: {
    backgroundColor: "#22C55E",
  },

  outgoingFill: {
    backgroundColor: "#F97316",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },

  emptyText: {
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 14,
    color: "#64748B",
  },
});