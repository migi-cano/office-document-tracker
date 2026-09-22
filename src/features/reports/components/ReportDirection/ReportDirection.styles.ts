import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  cardWrapper: {
    flex: 1,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    minHeight: 230,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  title: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  centerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  centerValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  centerLabel: {
    fontSize: 11,
    color: "#64748B",
  },

  legend: {
    marginTop: 14,
    gap: 8,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  indicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
  },

  label: {
    fontSize: 12,
    color: "#475569",
  },

  value: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },

  incoming: {
    backgroundColor: "#22C55E",
  },

  outgoing: {
    backgroundColor: "#F97316",
  },
});