import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  imageCard: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  documentImage: {
    width: "100%",
    height: "100%",
  },

  section: {
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  sectionDescription: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },

  infoCard: {
    marginTop: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },

  infoContent: {
    flex: 1,
    marginLeft: 14,
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  infoValue: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  actionCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 82,
    paddingHorizontal: 16,
  },

  actionButtonPressed: {
    backgroundColor: "#F9FAFB",
  },

  actionIconIncoming: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },

  actionIconOutgoing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0FDF4",
  },

  actionContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  actionDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: "#6B7280",
  },

  actionDivider: {
    height: 1,
    marginLeft: 74,
    backgroundColor: "#E5E7EB",
  },

  bottomSpacing: {
    height: 12,
  },
});