import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  notificationCount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  actionSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#6B7280",
  },

  markAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
  },

  markAllButtonPressed: {
    opacity: 0.7,
  },

  markAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4,
  },

  sectionTitle: {
    marginRight: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 24,
  },

  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    textAlign: "center",
  },
});