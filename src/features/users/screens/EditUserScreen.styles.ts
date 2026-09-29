import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  accountInfo: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    marginTop: 3,
    fontSize: 14,
    color: "#6B7280",
  },

  role: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
  },

  deleteText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
  },

  deleteOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  deleteModal: {
    width: "88%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
  },

  warningIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    alignSelf: "center",
    marginBottom: 16,
  },

  deleteTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  deleteDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    textAlign: "center",
  },

  deleteUserEmail: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },

  confirmLabel: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  confirmInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  deleteActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  cancelDeleteButton: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  cancelDeleteText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  confirmDeleteButton: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#DC2626",
  },

  confirmDeleteButtonDisabled: {
    backgroundColor: "#FCA5A5",
  },

  confirmDeleteText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});