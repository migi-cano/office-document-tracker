import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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

  totalLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 2,
  },

  totalValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
  },

  legend: {
    marginTop: 20,
    gap: 12,
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

  legendIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  legendLabel: {
    fontSize: 14,
    color: "#374151",
  },

  legendValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
});