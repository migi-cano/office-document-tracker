import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

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
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  trackingNumber: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  statusBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
    textTransform: "uppercase",
  },

  body: {
    marginTop: 14,
  },

  department: {
    fontSize: 14,
    color: "#334155",
  },

  date: {
    marginTop: 6,
    fontSize: 13,
    color: "#94A3B8",
  },
});